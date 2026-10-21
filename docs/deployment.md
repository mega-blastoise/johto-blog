# AWS production deployment

Prize Map now has a GitHub Actions release workflow and a parameterized AWS CloudFormation template. The workflow builds the root `dist/` directory, syncs it to a private S3 bucket, waits for a CloudFront invalidation, and checks the public URL.

The repository does not currently have a GitHub remote, and no AWS deployment identifiers are recorded here. Those are the only blockers to activating the pipeline.

## 1. Create or connect the GitHub repository

Create the repository under the GitHub owner you want to use, then add it as `origin` and push `main`:

```bash
git remote add origin git@github.com:OWNER/prize-map.git
git push -u origin main
```

Use GitHub’s branch-protection controls to require pull requests or status checks on `main` before enabling production deployments.

## 2. Prepare the domain and certificate

Choose the fully qualified production domain, for example `prize-map.example.com`.

1. Confirm the parent domain has a Route 53 hosted zone and copy its hosted-zone ID.
2. In **ACM, region `us-east-1`**, request a public certificate for the exact production domain.
3. Validate the certificate’s DNS record and copy the certificate ARN.

CloudFront requires its ACM certificate in `us-east-1`, even when the S3 bucket is in another region.

## 3. Create the GitHub OIDC provider and exact subject

The workflow uses short-lived OIDC credentials rather than stored AWS access keys.

Check whether the AWS account already has GitHub’s provider:

```bash
aws iam list-open-id-connect-providers \
  --query "OpenIDConnectProviderList[?contains(Arn, 'token.actions.githubusercontent.com')].Arn" \
  --output text
```

If that prints nothing, create it once per AWS account:

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com
```

Copy the provider ARN. Next, derive the OIDC subject for the production GitHub Environment. For a repository using GitHub’s immutable subject format, this command constructs the expected value:

```bash
gh api repos/OWNER/prize-map \
  --jq '"repo:\(.owner.login)@\(.owner.id)/\(.name)@\(.id):environment:production"'
```

For an older repository that has not opted into immutable subjects, use `repo:OWNER/prize-map:environment:production`. Use the exact subject emitted by your repository; do not loosen the IAM trust condition.

## 4. Deploy the CloudFormation stack

Choose the S3 region and a globally unique lowercase bucket name. The template creates the private bucket, CloudFront distribution and routing function, Route 53 `A`/`AAAA` aliases, least-privilege GitHub role, and cache policy.

```bash
aws cloudformation deploy \
  --region AWS_REGION \
  --stack-name prize-map-production \
  --template-file infra/aws-static-site.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    SiteBucketName=UNIQUE_BUCKET_NAME \
    DomainName=prize-map.example.com \
    HostedZoneId=ROUTE53_HOSTED_ZONE_ID \
    AcmCertificateArn=ACM_CERTIFICATE_ARN \
    GitHubOidcProviderArn=GITHUB_OIDC_PROVIDER_ARN \
    GitHubOidcSubject='EXACT_GITHUB_OIDC_SUBJECT'
```

Read the stack outputs after it completes:

```bash
aws cloudformation describe-stacks \
  --region AWS_REGION \
  --stack-name prize-map-production \
  --query 'Stacks[0].Outputs' \
  --output table
```

The template keeps the bucket if the stack is deleted, protecting published content from an accidental stack deletion.

## 5. Configure the GitHub `production` Environment

In **GitHub → repository Settings → Environments**, create `production`. Restrict deployments to `main` and add any reviewer gate you want. Then set these environment variables from the stack outputs:

| Variable | Value |
| --- | --- |
| `AWS_REGION` | The stack region |
| `AWS_ROLE_TO_ASSUME` | `GitHubDeploymentRoleArn` |
| `S3_BUCKET` | `S3BucketName` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `CloudFrontDistributionId` |
| `SITE_URL` | `SiteUrl` |

They are configuration, not credentials; do not add `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY`.

## 6. Release and verify

Push to `main`, then open **Actions → Deploy to AWS**. The job must pass type checks, lint, tests, and build before it can deploy. It will publish the artifact, invalidate `/*` in CloudFront, wait for completion, and request `SITE_URL`.

Test a deep link such as `/posts/meta-brief-template/` directly after the first release. The CloudFront Function in the template rewrites trailing-slash requests to the generated `index.html` documents, while 403/404 fallbacks let React handle unknown client routes.

## Current hosting

The existing private Sites deployment remains unchanged until this stack is created and the GitHub workflow completes its first successful AWS release. Do not delete that deployment until the custom domain and deep links have been verified on CloudFront.
