import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, Quote, HelpCircle, Lightbulb, Flame, Check } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { AddHabitSheet } from "@/components/AddHabitSheet";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  getSparkForDate, todayDateKey, markSparkVisited, getSparkStreak,
  saveAnswer, getAnswerForDate, getAnswers,
} from "@/lib/spark";
import type { SparkAnswer } from "@/lib/spark";
import { toast } from "sonner";

export const Route = createFileRoute("/spark")({
  component: SparkPage,
  head: () => ({
    meta: [
      { title: "DailyMint — Daily Spark" },
      { name: "description", content: "A daily quote, question, or insight to spark reflection and momentum." },
    ],
  }),
});

function SparkPage() {
  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [savedAnswer, setSavedAnswer] = useState<SparkAnswer | undefined>();
  const [streak, setStreak] = useState(0);
  const [allAnswers, setAllAnswers] = useState<SparkAnswer[]>([]);

  const today = todayDateKey();
  const spark = getSparkForDate(today);

  useEffect(() => {
    setMounted(true);
    markSparkVisited(today);
    setStreak(getSparkStreak());
    const existing = getAnswerForDate(today);
    setSavedAnswer(existing);
    if (existing) setAnswer(existing.answer);
    setAllAnswers(getAnswers().sort((a, b) => b.date.localeCompare(a.date)));
  }, [today]);

  if (!mounted) return null;

  const handleSave = () => {
    if (!answer.trim()) return;
    saveAnswer(today, spark.text, answer.trim());
    setSavedAnswer({ date: today, question: spark.text, answer: answer.trim() });
    setAllAnswers(getAnswers().sort((a, b) => b.date.localeCompare(a.date)));
    toast.success("Reflection saved");
  };

  const Icon = spark.type === "quote" ? Quote : spark.type === "question" ? HelpCircle : Lightbulb;
  const typeLabel = spark.type === "quote" ? "Quote" : spark.type === "question" ? "Question" : "Did you know";

  // Gradient per type
  const gradient =
    spark.type === "quote"
      ? "from-primary/10 via-card to-card"
      : spark.type === "question"
        ? "from-accent/10 via-card to-card"
        : "from-secondary/30 via-card to-card";

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="max-w-lg mx-auto px-5 pt-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold tracking-tight">Daily Spark</h1>
          </div>
          {streak > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Flame className="w-3.5 h-3.5" />
              {streak} {streak === 1 ? "day" : "days"}
            </div>
          )}
        </div>

        {/* Main card */}
        <div className={`rounded-3xl border border-border/60 bg-gradient-to-br ${gradient} p-7 shadow-sm`}>
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-primary font-semibold mb-5">
            <Icon className="w-3.5 h-3.5" />
            {typeLabel}
          </div>

          <p className="text-2xl leading-snug font-medium text-foreground tracking-tight">
            {spark.type === "quote" ? <>&ldquo;{spark.text}&rdquo;</> : spark.text}
          </p>

          {spark.attribution && (
            <p className="text-sm text-muted-foreground mt-4">— {spark.attribution}</p>
          )}

          {spark.type === "question" && (
            <div className="mt-6 space-y-3">
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your reflection…"
                rows={4}
                className="resize-none bg-background/60"
              />
              <div className="flex items-center justify-between">
                {savedAnswer && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-primary" />
                    Saved
                  </div>
                )}
                <Button onClick={handleSave} size="sm" className="ml-auto" disabled={!answer.trim()}>
                  {savedAnswer ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          A new Spark arrives every day at midnight.
        </p>

        {/* Past reflections */}
        {allAnswers.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Your reflections
            </h2>
            <div className="space-y-3">
              {allAnswers.map((a) => (
                <div key={a.date} className="rounded-2xl border border-border/60 bg-card p-4">
                  <div className="text-xs text-muted-foreground mb-1.5">
                    {new Date(a.date + "T00:00:00").toLocaleDateString(undefined, {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </div>
                  <p className="text-sm font-medium text-foreground/90 mb-2">{a.question}</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{a.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav onAddClick={() => setSheetOpen(true)} />
      <AddHabitSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onAdd={() => setSheetOpen(false)}
      />
    </div>
  );
}
