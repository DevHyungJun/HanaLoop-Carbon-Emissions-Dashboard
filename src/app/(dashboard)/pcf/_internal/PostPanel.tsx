"use client";

import { useEffect, useRef, useState } from "react";
import { Pencil, Plus } from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/common";
import { useToast } from "@/app/components/state";
import {
  DEFAULT_DATE_RANGE,
  TOOLBAR_ICON_TEXT_BUTTON_CLASS,
  TOOLBAR_INPUT_CLASS,
  TOOLBAR_SELECT_CLASS,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import {
  createOrUpdatePost,
  type CreateOrUpdatePostInput,
} from "@/app/lib/api";
import type { Post } from "@/app/types/post";

type PostFormState = {
  id?: string;
  title: string;
  dateTime: string;
  content: string;
};

type PostPanelProps = {
  posts: Post[];
  companyId: string;
  onPostsChange: (posts: Post[]) => void;
};

const EMPTY_FORM: PostFormState = {
  title: "",
  dateTime: DEFAULT_DATE_RANGE.to,
  content: "",
};

const PostPanel = ({ posts, companyId, onPostsChange }: PostPanelProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [form, setForm] = useState<PostFormState | null>(null);
  const [savingPostId, setSavingPostId] = useState<string | null>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!form) {
      return;
    }

    titleInputRef.current?.focus();
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

    const previousPosts = posts;
    const nextPosts = form.id
      ? posts.map((post) => (post.id === form.id ? optimisticPost : post))
      : [optimisticPost, ...posts];

    onPostsChange(nextPosts);
    setSavingPostId(optimisticId);
    closeForm();

    try {
      const savedPost = await createOrUpdatePost(input);
      onPostsChange(
        nextPosts.map((post) => (post.id === optimisticId ? savedPost : post)),
      );
      toast.default(t("pcf.post.saveSuccess"));
    } catch {
      onPostsChange(previousPosts);
      toast.error(t("pcf.post.saveError"));
    } finally {
      setSavingPostId(null);
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
          <div className="grid gap-3 rounded-xl border border-border bg-muted/20 p-4">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">{t("pcf.post.fieldTitle")}</span>
              <input
                ref={titleInputRef}
                value={form.title}
                onChange={(event) =>
                  setForm((current) =>
                    current
                      ? { ...current, title: event.target.value }
                      : current,
                  )
                }
                className={TOOLBAR_INPUT_CLASS}
              />
            </label>

            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">{t("pcf.post.fieldMonth")}</span>
              <input
                type="month"
                value={form.dateTime}
                onChange={(event) =>
                  setForm((current) =>
                    current
                      ? { ...current, dateTime: event.target.value }
                      : current,
                  )
                }
                className={TOOLBAR_SELECT_CLASS}
              />
            </label>

            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">{t("pcf.post.fieldContent")}</span>
              <textarea
                value={form.content}
                onChange={(event) =>
                  setForm((current) =>
                    current
                      ? { ...current, content: event.target.value }
                      : current,
                  )
                }
                rows={4}
                className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </label>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeForm}>
                {t("pcf.post.cancel")}
              </Button>
              <Button type="button" onClick={() => void handleSubmit()}>
                {t("pcf.post.save")}
              </Button>
            </div>
          </div>
        ) : null}

        {visiblePosts.length === 0 && !form ? (
          <p className="text-sm text-muted-foreground">{t("pcf.post.empty")}</p>
        ) : visiblePosts.length > 0 ? (
          <ul className="space-y-3">
            {visiblePosts.map((post) => (
              <li
                key={post.id}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{post.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {post.dateTime}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={TOOLBAR_ICON_TEXT_BUTTON_CLASS}
                    onClick={() => openEditForm(post)}
                    disabled={savingPostId === post.id}
                  >
                    <Pencil className="size-4" aria-hidden />
                    {t("pcf.post.edit")}
                  </Button>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {post.content}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default PostPanel;
