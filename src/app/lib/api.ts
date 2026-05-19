import { MOCK_COMPANIES, MOCK_COUNTRIES, MOCK_POSTS } from "@/app/mock/data";
import { EMISSION_FACTOR_DEFINITIONS } from "@/app/constants/emission-factors";
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

export const fetchEmissionFactors = async (): Promise<EmissionFactor[]> => {
  return withDelay(() => structuredClone(EMISSION_FACTOR_DEFINITIONS));
};

export const fetchPosts = async (): Promise<Post[]> => {
  return withDelay(() => structuredClone(postsStore));
};

export type CreateOrUpdatePostInput = Omit<Post, "id"> & { id?: string };

export class PostSaveError extends Error {
  constructor(message = "게시글 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.") {
    super(message);
    this.name = "PostSaveError";
  }
}

export const createOrUpdatePost = async (
  input: CreateOrUpdatePostInput,
): Promise<Post> => {
  await delay(jitter());

  if (maybeFail()) {
    throw new PostSaveError();
  }

  const existingIndex = input.id
    ? postsStore.findIndex((post) => post.id === input.id)
    : -1;

  if (existingIndex >= 0) {
    const updatedPost: Post = {
      id: input.id!,
      title: input.title,
      resourceUid: input.resourceUid,
      dateTime: input.dateTime,
      content: input.content,
    };

    postsStore[existingIndex] = updatedPost;
    return structuredClone(updatedPost);
  }

  const createdPost: Post = {
    id: input.id ?? crypto.randomUUID(),
    title: input.title,
    resourceUid: input.resourceUid,
    dateTime: input.dateTime,
    content: input.content,
  };

  postsStore = [...postsStore, createdPost];
  return structuredClone(createdPost);
};
