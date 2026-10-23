# AWS production deployment

Prize Map is served from a private S3 bucket behind CloudFront. The AWS resources are created once by hand in the console; GitHub Actions then releases every pushed `v*` tag:

1. **Sanity check** — install, build, check types, lint, test (`.github/workflows/sanity-check.yaml`, also run on every branch push and PR).
2. **Deploy** — assume an IAM role through GitHub OIDC, upload `apps/web/dist` to S3, invalidate CloudFront, then delete stale objects (`.github/workflows/deploy-aws.yaml`).
3. **Release** — publish a GitHub Release for the tag with generated notes.

No AWS access keys are stored anywhere. The setup below uses these placeholders:

| Placeholder       | Example                |
| ----------------- | ---------------------- |
| `DOMAIN`          | `prizemap.example.com` |
| `BUCKET`          | `prize-map-production` |
| `REGION`          | `us-east-1`            |
| `ACCOUNT_ID`      | `123456789012`         |
| `DISTRIBUTION_ID` | `E2ABCDEF123456`       |

## 1. Certificate (ACM)

In **ACM, region `us-east-1`** (CloudFront only reads certificates from there, whatever region the bucket is in), request a public certificate for `DOMAIN` and validate it through DNS. If the zone is in Route 53, use **Create records in Route 53**.

## 2. Bucket (S3)

Create `BUCKET` in `REGION` with **Block all public access** on and static website hosting **off**. CloudFront reads it through Origin Access Control, never as a public website.

## 3. Routing function (CloudFront → Functions)

The build writes one `index.html` per route (`/posts/<slug>/index.html`). S3 behind OAC has no index-document behavior, so without this function every deep link except `/` fails.

Create a function named `prize-map-routing`, runtime **cloudfront-js-2.0**, with this code, then **Publish** it:

```js
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith("/")) {
    request.uri += "index.html";
  } else if (!uri.split("/").pop().includes(".")) {
    request.uri += "/index.html";
  }

  return request;
}
```

## 4. Distribution (CloudFront)

Create a distribution:

- **Origin:** the `BUCKET` S3 REST endpoint (not the website endpoint), **Origin access: Origin access control settings** with a new OAC (sign requests).
- **Viewer protocol policy:** Redirect HTTP to HTTPS. **Allowed methods:** GET, HEAD.
- **Cache policy:** `CachingOptimized`. It honors the `Cache-Control` headers the workflow sets on each object.
- **Function associations:** Viewer request → CloudFront Functions → `prize-map-routing`.
- **Alternate domain name:** `DOMAIN`, with the ACM certificate from step 1.
- **Default root object:** `index.html`.
- **Price class:** North America and Europe is plenty.

After it is created, add two **Error pages** so React's not-found page handles unknown routes:

| HTTP error code | Response page path | Response code | Error caching min TTL |
| --------------- | ------------------ | ------------- | --------------------- |
| 403             | `/index.html`      | 200           | 0                     |
| 404             | `/index.html`      | 200           | 0                     |

Then copy the bucket policy CloudFront offers and paste it into **S3 → BUCKET → Permissions → Bucket policy**. It should look like:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "cloudfront.amazonaws.com" },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::BUCKET/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

## 5. DNS (Route 53)

In the `DOMAIN` hosted zone, create `A` and `AAAA` records, **Alias → CloudFront distribution**.

## 6. GitHub OIDC role (IAM)

**Identity provider** (once per AWS account): IAM → Identity providers → Add provider → **OpenID Connect**, provider URL `https://token.actions.githubusercontent.com`, audience `sts.amazonaws.com`. Skip this if it already exists.

**Role:** IAM → Roles → Create role → **Web identity**, the provider above, audience `sts.amazonaws.com`. Name it `prize-map-github-deploy` and replace its trust policy with:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:mega-blastoise/johto-blog:environment:production"
        }
      }
    }
  ]
}
```

Only jobs running in this repository's `production` environment can assume the role. If the deploy fails with `Not authorized to perform sts:AssumeRoleWithWebIdentity`, the `sub` value is the first thing to check. Repositories opted into GitHub's immutable subject format use `repo:OWNER@OWNER_ID/REPO@REPO_ID:environment:production` instead.

Attach this inline permissions policy (`prize-map-release`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::BUCKET"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::BUCKET/*"
    },
    {
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"],
      "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
    }
  ]
}
```

## 7. GitHub `production` environment

In **GitHub → Settings → Environments**, create `production`:

- **Deployment branches and tags:** Selected branches and tags → add a **tag** rule `v*`. Branch refs cannot deploy.
- **Environment variables** (configuration, not secrets):

| Variable                     | Value                                                  |
| ---------------------------- | ------------------------------------------------------ |
| `AWS_REGION`                 | `REGION`                                               |
| `AWS_ROLE_TO_ASSUME`         | `arn:aws:iam::ACCOUNT_ID:role/prize-map-github-deploy` |
| `S3_BUCKET`                  | `BUCKET`                                               |
| `CLOUDFRONT_DISTRIBUTION_ID` | `DISTRIBUTION_ID`                                      |
| `SITE_URL`                   | `https://DOMAIN`                                       |

## 8. Release

```bash
git tag v0.2.0
git push origin v0.2.0
```

Follow it in **Actions → Deploy to AWS**. A release uploads content-hashed files with a one-year immutable `Cache-Control` and the HTML, `app.js`, and `app.css` so browsers always revalidate while CloudFront keeps them until the next invalidation. It waits for the `/*` invalidation, removes objects that are no longer in the build, checks `/`, `/posts/`, and `/about/` on `SITE_URL`, and publishes the GitHub Release.

To redeploy an existing version, run **Deploy to AWS** manually and pick the tag under **Use workflow from**.

After the first release, open a deep link such as `/posts/meta-brief-template/` directly in a fresh tab to confirm the routing function.
