import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Plus, MessagesSquare, Sparkles } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { AddHabitSheet } from "@/components/AddHabitSheet";
import { QuestionCard } from "@/components/QuestionCard";
import { AskQuestionSheet } from "@/components/AskQuestionSheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  fetchQuestions, postQuestion, inferUserCategories, pickDefaultCategory,
  CATEGORIES, type Category, type CommunityQuestion,
} from "@/lib/community";
import { getHabits } from "@/lib/habits";
import { fetchHabitsFromCloud } from "@/lib/habits-cloud";
import type { Habit } from "@/lib/habits";
import { toast } from "sonner";

export const Route = createFileRoute("/questions")({
  component: QuestionsPage,
  head: () => ({
    meta: [
      { title: "DailyMint — Community Questions" },
      { name: "description", content: "Anonymous questions and reflections from people building habits like yours." },
    ],
  }),
});

type Tab = "for-you" | "all" | "mine";

function QuestionsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [questions, setQuestions] = useState<CommunityQuestion[]>([]);
  const [tab, setTab] = useState<Tab>("for-you");
  const [activeCat, setActiveCat] = useState<Category | null>(null);
  const [askOpen, setAskOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Redirect to login if not authed (community is auth-required)
  useEffect(() => {
    if (mounted && !authLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [mounted, authLoading, user, navigate]);

  // Load habits (cloud or local) for category inference
  useEffect(() => {
    (async () => {
      if (user) {
        try { setHabits(await fetchHabitsFromCloud(user.id)); }
        catch { setHabits(getHabits()); }
      } else {
        setHabits(getHabits());
      }
    })();
  }, [user]);

  const myCategories = useMemo(() => inferUserCategories(habits), [habits]);
  const defaultCategory = useMemo(() => pickDefaultCategory(habits), [habits]);

  const refresh = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const filterCats =
        activeCat ? [activeCat]
        : tab === "for-you" && myCategories.length > 0 ? myCategories
        : undefined;
      const data = await fetchQuestions({
        categories: filterCats,
        mineOnly: tab === "mine",
        userId: user.id,
      });
      setQuestions(data);
    } catch (e) {
      console.error(e);
      toast.error("Couldn't load questions");
    } finally {
      setLoading(false);
    }
  }, [user, tab, activeCat, myCategories]);

  useEffect(() => { refresh(); }, [refresh]);

  const handlePost = async (category: Category, body: string) => {
    if (!user) return;
    try {
      const id = await postQuestion(user.id, category, body);
      toast.success("Posted anonymously");
      navigate({ to: "/questions/$id", params: { id } });
    } catch (e: any) {
      toast.error(e?.message || "Couldn't post question");
    }
  };

  if (!mounted || authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="max-w-lg mx-auto px-5 pt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MessagesSquare className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold tracking-tight">Questions</h1>
          </div>
          <Button size="sm" onClick={() => setAskOpen(true)} className="gap-1.5">
            <Plus className="w-4 h-4" /> Ask
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4 p-1 rounded-xl bg-muted/50 w-fit">
          {([
            { id: "for-you" as const, label: "For you" },
            { id: "all" as const, label: "All" },
            { id: "mine" as const, label: "Mine" },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setActiveCat(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                tab === t.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          <button
            onClick={() => setActiveCat(null)}
            className={`px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold transition-colors ${
              activeCat === null ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((c) => {
            const isMine = myCategories.includes(c);
            return (
              <button
                key={c}
                onClick={() => setActiveCat(activeCat === c ? null : c)}
                className={`px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold transition-colors ${
                  activeCat === c
                    ? "bg-primary text-primary-foreground"
                    : isMine
                      ? "bg-primary/10 text-primary hover:bg-primary/15"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center text-sm text-muted-foreground py-12">Loading…</div>
        ) : questions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 py-12 text-center">
            <Sparkles className="w-6 h-6 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-foreground font-medium">No questions yet</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              {tab === "mine" ? "You haven't posted anything yet." : "Be the first to ask."}
            </p>
            <Button size="sm" variant="outline" onClick={() => setAskOpen(true)}>
              Ask a question
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((q) => <QuestionCard key={q.id} question={q} />)}
          </div>
        )}
      </div>

      <AskQuestionSheet
        open={askOpen}
        onClose={() => setAskOpen(false)}
        onSubmit={handlePost}
        defaultCategory={defaultCategory}
      />
      <BottomNav onAddClick={() => setAddOpen(true)} />
      <AddHabitSheet
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={() => setAddOpen(false)}
      />
    </div>
  );
}
