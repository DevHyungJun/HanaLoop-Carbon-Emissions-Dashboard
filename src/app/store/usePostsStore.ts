import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Post } from "@/app/types/post";

const SEED_POST_IDS = new Set(["post-1", "post-2", "post-3"]);

type PostsState = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  upsertPost: (post: Post) => void;
  deletePost: (id: string) => void;
};

export const usePostsStore = create<PostsState>()(
  persist(
    (set) => ({
      posts: [],
      setPosts: (posts) => set({ posts }),
      upsertPost: (post) =>
        set((state) => {
          const existingIndex = state.posts.findIndex((item) => item.id === post.id);

          if (existingIndex >= 0) {
            const nextPosts = [...state.posts];
            nextPosts[existingIndex] = post;
            return { posts: nextPosts };
          }

          return { posts: [post, ...state.posts] };
        }),
      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        })),
    }),
    {
      name: "hana-loop-posts",
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as PostsState;

        return {
          posts: state.posts.filter((post) => !SEED_POST_IDS.has(post.id)),
        };
      },
    },
  ),
);
