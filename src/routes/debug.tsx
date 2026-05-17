import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { ChevronLeft, RefreshCw, Database, Loader2 } from "lucide-react";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
  head: () => ({
    meta: [
      { title: "Database Explorer — Emberly" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

const TABLES = ["profiles", "habits", "habit_logs", "spark_entries"] as const;
type TableName = (typeof TABLES)[number];

interface TableState {
  rows: Record<string, unknown>[];
  loading: boolean;
  error: string | null;
}

function DebugPage() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState<TableName>("habits");
  const [data, setData] = useState<Record<TableName, TableState>>(() =>
    Object.fromEntries(
      TABLES.map((t) => [t, { rows: [], loading: false, error: null }]),
    ) as Record<TableName, TableState>,
  );

  useEffect(() => {
    if (!authLoading && !user) void navigate({ to: "/login" });
  }, [authLoading, user, navigate]);

  const load = useCallback(
    async (table: TableName) => {
      if (!user) return;
      setData((d) => ({ ...d, [table]: { ...d[table], loading: true, error: null } }));
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        const q = supabase.from(table).select("*").limit(500);
        // profiles uses `id`; other tables use `user_id`
        const scoped = table === "profiles" ? q.eq("id", user.id) : q.eq("user_id", user.id);
        const { data: rows, error } = await scoped;
        if (error) throw error;
        setData((d) => ({
          ...d,
          [table]: { rows: (rows ?? []) as Record<string, unknown>[], loading: false, error: null },
        }));
      } catch (e: any) {
        setData((d) => ({
          ...d,
          [table]: { rows: [], loading: false, error: e.message ?? "Query failed" },
        }));
      }
    },
    [user],
  );

  useEffect(() => {
    if (user) void load(active);
  }, [user, active, load]);

  if (authLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!user) return null;

  const state = data[active];

  return (
    <div className="min-h-dvh bg-background text-foreground pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/85 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center gap-3">
          <Link
            to="/app"
            className="w-9 h-9 rounded-full grid place-items-center hover:bg-muted transition"
            aria-label="Back to app"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <Database className="w-4 h-4 text-primary" />
            <h1 className="text-sm font-semibold">Database Explorer</h1>
          </div>
          <button
            type="button"
            onClick={() => void load(active)}
            disabled={state.loading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold hover:bg-muted/70 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${state.loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-5 pb-3 flex gap-1.5 overflow-x-auto">
          {TABLES.map((t) => {
            const isActive = t === active;
            const count = data[t].rows.length;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActive(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
                {count > 0 && (
                  <span className={`ml-1.5 ${isActive ? "opacity-80" : "opacity-60"}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Body */}
      <main className="max-w-5xl mx-auto px-5 py-5">
        <p className="text-[11px] text-muted-foreground mb-3">
          Showing rows visible to <span className="font-mono">{user.email}</span> via Row-Level Security.
          Read-only.
        </p>

        {state.error ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 text-destructive px-4 py-3 text-sm">
            {state.error}
          </div>
        ) : state.loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-12 justify-center">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : state.rows.length === 0 ? (
          <div className="text-sm text-muted-foreground py-12 text-center border border-dashed border-border rounded-xl">
            No rows in <span className="font-mono">{active}</span>.
          </div>
        ) : (
          <DataTable rows={state.rows} />
        )}
      </main>
    </div>
  );
}

function DataTable({ rows }: { rows: Record<string, unknown>[] }) {
  const columns = Array.from(
    rows.reduce<Set<string>>((set, row) => {
      Object.keys(row).forEach((k) => set.add(k));
      return set;
    }, new Set()),
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-xs">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            {columns.map((c) => (
              <th key={c} className="text-left font-semibold px-3 py-2 whitespace-nowrap">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border hover:bg-muted/30">
              {columns.map((c) => (
                <td key={c} className="px-3 py-2 align-top font-mono max-w-[280px]">
                  <CellValue value={row[c]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CellValue({ value }: { value: unknown }) {
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground/60 italic">null</span>;
  }
  if (typeof value === "boolean") return <span>{value ? "true" : "false"}</span>;
  if (typeof value === "object") {
    return (
      <pre className="whitespace-pre-wrap break-words text-[11px]">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }
  const str = String(value);
  return <span className="break-words whitespace-pre-wrap">{str}</span>;
}
