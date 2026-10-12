import { useSuspenseQuery } from "@tanstack/react-query";

import PostsService from "@/services/Posts";

import type { Article } from "@prize-map/types";
import type { UseSuspenseQueryResult } from "@tanstack/react-query";

const postsService = new PostsService();

export const postsQueryKey = ["posts"] as const;

export async function getPosts(): Promise<Article[]> {
  return postsService.fetchPosts();
}

export async function getPost(slug: string): Promise<Article | null> {
  return postsService.fetchPost(slug);
}

export async function getRelatedPosts(slug: string): Promise<Article[]> {
  return postsService.fetchRelatedPosts(slug);
}

export function useGetPosts(): UseSuspenseQueryResult<Article[], Error> {
  return useSuspenseQuery({ queryKey: postsQueryKey, queryFn: getPosts });
}

export function useGetPost(
  slug: string,
): UseSuspenseQueryResult<Article | null, Error> {
  return useSuspenseQuery({
    queryKey: ["post", slug],
    queryFn: () => getPost(slug),
  });
}

export function useGetRelatedPosts(
  slug: string,
): UseSuspenseQueryResult<Article[], Error> {
  return useSuspenseQuery({
    queryKey: ["related-posts", slug],
    queryFn: () => getRelatedPosts(slug),
  });
}
