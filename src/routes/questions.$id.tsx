import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, MessageCircle, Trash2, Flag } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { AddHabitSheet } from "@/components/AddHabitSheet";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  fetchQuestion, fetchReplies, postReply, deleteQuestion, deleteReply, reportPost, timeAgo,
  type CommunityQuestion, type CommunityReply,
} from "@/lib/community";
import { toast } from "sonner";

export const Route = createFileRoute("/questions/$id")({
  component: QuestionDetailPage,
  head: () => ({
    meta: [
      { title: "DailyMint — Question" },
      { name: "description", content: "Anonymous reflections from the community." },
    ],
  }),
});

function QuestionDetailPage() {
  const { id } = Route.useParams();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<CommunityQuestion | null>(null);
  const [replies, setReplies] = useState<CommunityReply[]>([]);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && !authLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [mounted, authLoading, user, navigate]);

  const refresh = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [q, r] = await Promise.all([fetchQuestion(id, user.id), fetchReplies(id, user.id)]);
      setQuestion(q);
      setReplies(r);
    } catch (e) {
      console.error(e);
      toast.error("Couldn't load question");
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  useEffect(() => { refresh(); }, [refresh]);

  // Realtime: live replies + question updates
  useEffect(() => {
    if (!user) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      if (cancelled) return;
      const channel = supabase
        .channel(`question:${id}`)
        .on("postgres_changes", { event: "*", schema: "public", table: "community_replies", filter: `question_id=eq.${id}` }, () => {
          void refresh();
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "community_questions", filter: `id=eq.${id}` }, () => {
          void refresh();
        })
        .subscribe();
      cleanup = () => { void supabase.removeChannel(channel); };
    })();
    return () => { cancelled = true; cleanup?.(); };
  }, [user, id, refresh]);

  const handleReply = async () => {
    if (!user || body.trim().length < 3) return;
    setSubmitting(true);
    try {
      await postReply(user.id, id, body.trim());
      setBody("");
      await refresh();
      toast.success("Reply posted anonymously");
    } catch (e: any) {
      toast.error(e?.message || "Couldn't post reply");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!confirm("Delete this question and all its replies?")) return;
    try {
      await deleteQuestion(id);
      toast.success("Question deleted");
      navigate({ to: "/questions" });
    } catch (e: any) {
      toast.error(e?.message || "Couldn't delete");
    }
  };

  const handleDeleteReply = async (rid: string) => {
    if (!confirm("Delete this reply?")) return;
    try {
      await deleteReply(rid);
      await refresh();
    } catch (e: any) {
      toast.error(e?.message || "Couldn't delete");
    }
  };

  const handleReport = async (targetType: "question" | "reply", targetId: string) => {
    if (!user) return;
    try {
      await reportPost(user.id, targetType, targetId);
      toast.success("Thanks — we'll review it.");
    } catch (e: any) {
      toast.error(e?.message || "Couldn't report");
    }
  };

  if (!mounted || authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="max-w-lg mx-auto px-5 pt-8">
        <Link
          to="/questions"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        {loading ? (
          <div className="text-center text-sm text-muted-foreground py-12">Loading…</div>
        ) : !question ? (
          <div className="rounded-2xl border border-dashed border-border/60 py-12 text-center">
            <p className="text-sm text-muted-foreground">Question not found.</p>
          </div>
        ) : (
          <>
            {/* Question */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-semibold">
                  {question.category}
                </span>
                <span className="text-[11px] text-muted-foreground">{timeAgo(question.created_at)}</span>
                {question.is_mine && (
                  <span className="text-[11px] text-muted-foreground">· yours</span>
                )}
              </div>
              <p className="text-lg text-foreground leading-snug font-medium">{question.body}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {question.reply_count} {question.reply_count === 1 ? "reply" : "replies"}
                </div>
                <div className="ml-auto flex items-center gap-3">
                  {question.is_mine ? (
                    <button
                      onClick={handleDeleteQuestion}
                      className="inline-flex items-center gap-1 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReport("question", question.id)}
                      className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <Flag className="w-3.5 h-3.5" /> Report
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Reply composer */}
            <div className="mt-6 space-y-2">
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value.slice(0, 1000))}
                placeholder="Share your reflection (anonymous)…"
                rows={4}
                maxLength={1000}
                className="resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">{body.length}/1000 · anonymous</span>
                <Button size="sm" onClick={handleReply} disabled={submitting || body.trim().length < 3}>
                  {submitting ? "Posting…" : "Post reply"}
                </Button>
              </div>
            </div>

            {/* Replies */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
              </h2>
              {replies.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/60 py-8 text-center">
                  <p className="text-sm text-muted-foreground">No replies yet. Be the first.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {replies.map((r) => (
                    <div key={r.id} className="rounded-2xl border border-border/60 bg-card p-4">
                      <div className="text-[11px] text-muted-foreground mb-1.5">
                        Anonymous · {timeAgo(r.created_at)}
                        {r.is_mine && " · you"}
                      </div>
                      <p className="text-sm text-foreground whitespace-pre-wrap">{r.body}</p>
                      <div className="mt-2 flex items-center justify-end text-[11px] text-muted-foreground">
                        {r.is_mine ? (
                          <button
                            onClick={() => handleDeleteReply(r.id)}
                            className="inline-flex items-center gap-1 hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReport("reply", r.id)}
                            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                          >
                            <Flag className="w-3 h-3" /> Report
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <BottomNav onAddClick={() => setAddOpen(true)} />
      <AddHabitSheet open={addOpen} onClose={() => setAddOpen(false)} onAdd={() => setAddOpen(false)} />
    </div>
  );
}
