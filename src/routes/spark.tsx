import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Sparkles, Quote, HelpCircle, Lightbulb, Flame, Check, Cloud, CloudOff, CalendarDays } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { AddHabitSheet } from "@/components/AddHabitSheet";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SparkHeatmap } from "@/components/SparkHeatmap";
import {
  getSparkForDate, todayDateKey, markSparkVisited, computeStreakFromDates,
  saveAnswer, getAnswerForDate, getAnswers, getVisitedDates,
} from "@/lib/spark";
import type { SparkAnswer } from "@/lib/spark";
import {
  fetchSparkEntries, markVisitedInCloud, saveAnswerInCloud, seedSampleEntries,
} from "@/lib/spark-cloud";
import type { CloudSparkEntry } from "@/lib/spark-cloud";
import { useAuth } from "@/hooks/use-auth";
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

interface JournalEntry {
  date: string;
  prompt: string;
  answer: string;
  type?: string;
}

function SparkPage() {
  const { user } = useAuth();
  const isCloud = !!user;

  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [savedAnswer, setSavedAnswer] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [seeding, setSeeding] = useState(false);
  const [heatmap, setHeatmap] = useState<Record<string, "answered" | "visited" | undefined>>({});

  const today = todayDateKey();
  const spark = getSparkForDate(today);

  const refresh = useCallback(async () => {
    const map: Record<string, "answered" | "visited" | undefined> = {};
    if (isCloud && user) {
      const cloud = await fetchSparkEntries(user.id);
      const dates = cloud.filter((e) => e.visited).map((e) => e.date);
      setStreak(computeStreakFromDates(dates));
      const todays = cloud.find((e) => e.date === today);
      setSavedAnswer(todays?.answer ?? null);
      setAnswer(todays?.answer ?? "");
      setEntries(
        cloud
          .filter((e: CloudSparkEntry) => !!e.answer)
          .map((e) => ({ date: e.date, prompt: e.prompt, answer: e.answer || "", type: e.spark_type })),
      );
      for (const e of cloud) {
        if (e.answer) map[e.date] = "answered";
        else if (e.visited) map[e.date] = "visited";
      }
    } else {
      markSparkVisited(today);
      const local: SparkAnswer[] = getAnswers().sort((a, b) => b.date.localeCompare(a.date));
      const todays = getAnswerForDate(today);
      setSavedAnswer(todays?.answer ?? null);
      setAnswer(todays?.answer ?? "");
      setEntries(local.map((a) => ({ date: a.date, prompt: a.question, answer: a.answer })));
      const { getSparkStreak } = await import("@/lib/spark");
      setStreak(getSparkStreak());
      for (const d of getVisitedDates()) map[d] = "visited";
      for (const a of local) map[a.date] = "answered";
    }
    setHeatmap(map);
  }, [isCloud, user, today]);

  useEffect(() => {
    setMounted(true);
    // Mark visited on mount
    (async () => {
      if (isCloud && user) {
        try {
          await markVisitedInCloud(user.id, today, spark.type, spark.text);
        } catch (e) {
          console.error("markVisitedInCloud failed", e);
        }
      }
      await refresh();
    })();
  }, [isCloud, user, today, spark.type, spark.text, refresh]);

  if (!mounted) return null;

  const handleSave = async () => {
    const trimmed = answer.trim();
    if (!trimmed) return;
    try {
      if (isCloud && user) {
        await saveAnswerInCloud(user.id, today, spark.type, spark.text, trimmed);
      } else {
        saveAnswer(today, spark.text, trimmed);
      }
      setSavedAnswer(trimmed);
      await refresh();
      toast.success("Reflection saved");
    } catch (e) {
      console.error(e);
      toast.error("Couldn't save reflection");
    }
  };

  const handleSeed = async () => {
    if (!user) return;
    setSeeding(true);
    try {
      const n = await seedSampleEntries(user.id);
      await refresh();
      toast.success(`Added ${n} sample reflections`);
    } catch (e) {
      console.error(e);
      toast.error("Couldn't seed reflections");
    } finally {
      setSeeding(false);
    }
  };

  const Icon = spark.type === "quote" ? Quote : spark.type === "question" ? HelpCircle : Lightbulb;
  const typeLabel = spark.type === "quote" ? "Quote" : spark.type === "question" ? "Question" : "Did you know";

  const gradient =
    spark.type === "quote"
      ? "from-primary/10 via-card to-card"
      : spark.type === "question"
        ? "from-accent/10 via-card to-card"
        : "from-secondary/30 via-card to-card";

  // Per-type prompt for the journal field
  const journalPrompt =
    spark.type === "question"
      ? "Type your reflection…"
      : spark.type === "quote"
        ? "What does this quote mean for you today?"
        : "Any thoughts or how will you apply this?";

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="max-w-lg mx-auto px-5 pt-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold tracking-tight">Daily Spark</h1>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1 text-[11px] text-muted-foreground"
              title={isCloud ? "Synced to your account" : "Saved on this device only"}
            >
              {isCloud ? <Cloud className="w-3.5 h-3.5" /> : <CloudOff className="w-3.5 h-3.5" />}
            </span>
            {streak > 0 && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Flame className="w-3.5 h-3.5" />
                {streak} {streak === 1 ? "day" : "days"}
              </div>
            )}
          </div>
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

          {/* Journal input — now available for ALL spark types */}
          <div className="mt-6 space-y-3">
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={journalPrompt}
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
              <Button
                onClick={handleSave}
                size="sm"
                className="ml-auto"
                disabled={!answer.trim() || answer.trim() === savedAnswer}
              >
                {savedAnswer ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          {isCloud ? "Synced across your devices." : "Sign in to sync across devices."} A new Spark arrives every day at midnight.
        </p>

        {/* Activity heatmap */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Last 12 weeks
            </h2>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-4">
            <SparkHeatmap byDate={heatmap} />
          </div>
        </div>

        {/* Past reflections */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Your reflections
            </h2>
            {isCloud && entries.length === 0 && (
              <Button onClick={handleSeed} size="sm" variant="outline" disabled={seeding}>
                {seeding ? "Adding…" : "Add samples"}
              </Button>
            )}
          </div>

          {entries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/60 py-10 text-center">
              <p className="text-sm text-muted-foreground">No reflections yet.</p>
              <p className="text-xs text-muted-foreground mt-1">Save one above to start your journal.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((a) => (
                <div key={a.date} className="rounded-2xl border border-border/60 bg-card p-4">
                  <div className="text-xs text-muted-foreground mb-1.5">
                    {new Date(a.date + "T00:00:00").toLocaleDateString(undefined, {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </div>
                  <p className="text-sm font-medium text-foreground/90 mb-2">{a.prompt}</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{a.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
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
