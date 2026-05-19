import { EMISSION_FACTOR_DEFINITIONS } from "@/app/constants/emission-factors";
import { MOCK_COMPANIES, MOCK_COUNTRIES, MOCK_POSTS } from "@/app/mock/data";
import type { Company } from "@/app/types/company";
import type { Country } from "@/app/types/country";
import type { EmissionFactor } from "@/app/types/emission-factor";
import type { Post } from "@/app/types/post";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;

let postsStore: Post[] = structuredClone(MOCK_POSTS);

const withDelay = async <T>(operation: () => T): Promise<T> => {
  await delay(jitter());
  return operation();
};

export const fetchCountries = async (): Promise<Country[]> => {
  return withDelay(() => structuredClone(MOCK_COUNTRIES));
};

export const fetchCompanies = async (): Promise<Company[]> => {
  return withDelay(() => structuredClone(MOCK_COMPANIES));
};

export const fetchPosts = async (): Promise<Post[]> => {
  return withDelay(() => structuredClone(postsStore));
};

export const fetchEmissionFactors = async (): Promise<EmissionFactor[]> => {
  return withDelay(() => structuredClone(EMISSION_FACTOR_DEFINITIONS));
};

export type CreateOrUpdatePostInput = Omit<Post, "id"> & { id?: string };

export class PostSaveError extends Error {
  constructor(message = "게시글 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.") {
    super(message);
    this.name = "PostSaveError";
  }
}

export class PostDeleteError extends Error {
  constructor(message = "게시글 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.") {
    super(message);
    this.name = "PostDeleteError";
  }
}

export const createOrUpdatePost = async (
  input: CreateOrUpdatePostInput,
): Promise<Post> => {
  await delay(jitter());

  if (maybeFail()) {
    throw new PostSaveError();
  }

  const post: Post = {
    id: input.id ?? crypto.randomUUID(),
    title: input.title,
    resourceUid: input.resourceUid,
    dateTime: input.dateTime,
    content: input.content,
  };

  const existingIndex = postsStore.findIndex((item) => item.id === post.id);

  if (existingIndex >= 0) {
    postsStore[existingIndex] = post;
  } else {
    postsStore = [post, ...postsStore];
  }

  return structuredClone(post);
};

export const deletePost = async (id: string): Promise<void> => {
  await delay(jitter());

  if (maybeFail()) {
    throw new PostDeleteError();
  }

  postsStore = postsStore.filter((post) => post.id !== id);
};
