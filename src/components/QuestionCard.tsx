import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import type { CommunityQuestion } from "@/lib/community";
import { timeAgo } from "@/lib/community";

interface Props {
  question: CommunityQuestion;
}

export function QuestionCard({ question }: Props) {
  return (
    <Link
      to="/questions/$id"
      params={{ id: question.id }}
      className="block rounded-2xl border border-border/60 bg-card p-4 hover:border-primary/40 hover:bg-card/80 transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-semibold">
          {question.category}
        </span>
        <span className="text-[11px] text-muted-foreground">{timeAgo(question.created_at)}</span>
        {question.is_mine && (
          <span className="text-[11px] text-muted-foreground">· yours</span>
        )}
      </div>
      <p className="text-[15px] text-foreground leading-snug">{question.body}</p>
      <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
        <MessageCircle className="w-3.5 h-3.5" />
        {question.reply_count} {question.reply_count === 1 ? "reply" : "replies"}
      </div>
    </Link>
  );
}
