"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/common";
import { useToast } from "@/app/components/state";
import { DEFAULT_DATE_RANGE, TOOLBAR_ICON_TEXT_BUTTON_CLASS } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import {
  createOrUpdatePost,
  deletePost as deletePostRequest,
  type CreateOrUpdatePostInput,
} from "@/app/lib/api";
import { usePostsStore } from "@/app/store";
import type { Post } from "@/app/types/post";

import PostForm, { type PostFormState } from "./PostForm";
import PostListItem from "./PostListItem";

type PostPanelProps = {
  posts: Post[];
  companyId: string;
};

const EMPTY_FORM: PostFormState = {
  title: "",
  dateTime: DEFAULT_DATE_RANGE.to,
  content: "",
};

const PostPanel = ({ posts, companyId }: PostPanelProps) => {
  const { locale, t } = useTranslation();
  const { toast } = useToast();
  const upsertPost = usePostsStore((state) => state.upsertPost);
  const deletePostFromStore = usePostsStore((state) => state.deletePost);
  const setPosts = usePostsStore((state) => state.setPosts);
  const [form, setForm] = useState<PostFormState | null>(null);
  const [processingPostId, setProcessingPostId] = useState<string | null>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const previousFormRef = useRef<PostFormState | null>(null);

  useEffect(() => {
    if (form && previousFormRef.current === null) {
      titleInputRef.current?.focus();
    }

    previousFormRef.current = form;
  }, [form]);

  const openCreateForm = () => {
    setForm({ ...EMPTY_FORM, dateTime: DEFAULT_DATE_RANGE.to });
  };

  const openEditForm = (post: Post) => {
    setForm({
      id: post.id,
      title: post.title,
      dateTime: post.dateTime,
      content: post.content,
    });
  };

  const closeForm = () => {
    setForm(null);
  };

  const handleSubmit = async () => {
    if (!form || !companyId) {
      return;
    }

    const trimmedTitle = form.title.trim();
    const trimmedContent = form.content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    const input: CreateOrUpdatePostInput = {
      id: form.id,
      title: trimmedTitle,
      resourceUid: companyId,
      dateTime: form.dateTime,
      content: trimmedContent,
    };

    const optimisticId = form.id ?? `temp-${crypto.randomUUID()}`;
    const optimisticPost: Post = {
      id: optimisticId,
      title: input.title,
      resourceUid: input.resourceUid,
      dateTime: input.dateTime,
      content: input.content,
    };

    const previousPosts = usePostsStore.getState().posts;

    upsertPost(optimisticPost);
    setProcessingPostId(optimisticId);
    closeForm();

    try {
      const savedPost = await createOrUpdatePost(input);

      if (savedPost.id !== optimisticId) {
        deletePostFromStore(optimisticId);
      }

      upsertPost(savedPost);
      toast.default(t("pcf.post.saveSuccess"));
    } catch {
      setPosts(previousPosts);
      toast.error(t("pcf.post.saveError"));
    } finally {
      setProcessingPostId(null);
    }
  };

  const handleDelete = async (postId: string) => {
    const previousPosts = usePostsStore.getState().posts;

    deletePostFromStore(postId);

    if (form?.id === postId) {
      closeForm();
    }

    setProcessingPostId(postId);

    try {
      await deletePostRequest(postId);
      toast.default(t("pcf.post.deleteSuccess"));
    } catch {
      setPosts(previousPosts);
      toast.error(t("pcf.post.deleteError"));
    } finally {
      setProcessingPostId(null);
    }
  };

  const visiblePosts = form?.id
    ? posts.filter((post) => post.id !== form.id)
    : posts;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{t("pcf.post.title")}</CardTitle>
          <CardDescription>{t("pcf.post.description")}</CardDescription>
        </div>
        <Button
          type="button"
          size="sm"
          className={TOOLBAR_ICON_TEXT_BUTTON_CLASS}
          onClick={openCreateForm}
        >
          <Plus className="size-4" aria-hidden />
          {t("pcf.post.add")}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {form ? (
          <PostForm
            form={form}
            titleInputRef={titleInputRef}
            onChange={setForm}
            onCancel={closeForm}
            onSubmit={() => void handleSubmit()}
          />
        ) : null}

        {visiblePosts.length === 0 && !form ? (
          <p className="text-sm text-muted-foreground">{t("pcf.post.empty")}</p>
        ) : visiblePosts.length > 0 ? (
          <ul className="min-w-0 space-y-3">
            {visiblePosts.map((post) => (
              <PostListItem
                key={post.id}
                post={post}
                locale={locale}
                isProcessing={processingPostId === post.id}
                readMoreLabel={t("pcf.post.readMore")}
                readLessLabel={t("pcf.post.readLess")}
                editLabel={t("pcf.post.edit")}
                deleteLabel={t("pcf.post.delete")}
                onEdit={openEditForm}
                onDelete={(targetPost) => void handleDelete(targetPost.id)}
              />
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default PostPanel;
