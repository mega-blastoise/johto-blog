import { posts as contentPosts } from "@prize-map/content-data";

import { selectRelatedArticles, sortArticles } from "./selectors";

import type { Article } from "@prize-map/types";

class PostsService {
  async fetchPosts(): Promise<Article[]> {
    return sortArticles(contentPosts);
  }

  async fetchPost(slug: string): Promise<Article | null> {
    return contentPosts.find((candidate) => candidate.slug === slug) ?? null;
  }

  async fetchRelatedPosts(slug: string): Promise<Article[]> {
    const [post, allPosts] = await Promise.all([
      this.fetchPost(slug),
      this.fetchPosts(),
    ]);
    return post ? selectRelatedArticles(post, allPosts) : [];
  }
}

export default PostsService;
