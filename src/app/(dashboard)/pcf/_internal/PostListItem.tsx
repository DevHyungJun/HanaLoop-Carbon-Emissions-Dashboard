"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/app/components/common";
import {
  POST_CONTENT_COLLAPSED_LINES,
  POST_CONTENT_EXPAND_MIN_LENGTH,
  TOOLBAR_ICON_TEXT_BUTTON_CLASS,
} from "@/app/constants";
import type { Locale } from "@/app/constants/i18n";
import type { Post } from "@/app/types/post";
import { cn, formatActivityMonthLong } from "@/app/utils";

type PostListItemProps = {
  post: Post;
  locale: Locale;
  isSaving: boolean;
  readMoreLabel: string;
  readLessLabel: string;
  editLabel: string;
  onEdit: (post: Post) => void;
};

const isContentExpandable = (content: string) =>
  content.length > POST_CONTENT_EXPAND_MIN_LENGTH ||
  content.split("\n").length > POST_CONTENT_COLLAPSED_LINES;

const PostListItem = ({
  post,
  locale,
  isSaving,
  readMoreLabel,
  readLessLabel,
  editLabel,
  onEdit,
}: PostListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const canExpandContent = isContentExpandable(post.content);

  return (
    <li className="min-w-0 rounded-xl border border-border bg-background p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className="truncate font-medium text-foreground"
            title={post.title}
          >
            {post.title}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatActivityMonthLong(post.dateTime, locale)}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn(TOOLBAR_ICON_TEXT_BUTTON_CLASS, "shrink-0")}
          onClick={() => onEdit(post)}
          disabled={isSaving}
        >
          <Pencil className="size-4" aria-hidden />
          {editLabel}
        </Button>
      </div>

      <div className="mt-3 min-w-0">
        <p
          className={cn(
            "text-sm leading-6 break-words text-muted-foreground",
            isExpanded ? "whitespace-pre-wrap" : "line-clamp-3",
          )}
        >
          {post.content}
        </p>

        {canExpandContent ? (
          <Button
            type="button"
            variant="link"
            size="sm"
            className="mt-1 h-auto px-0"
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded ? readLessLabel : readMoreLabel}
          </Button>
        ) : null}
      </div>
    </li>
  );
};

export default PostListItem;
