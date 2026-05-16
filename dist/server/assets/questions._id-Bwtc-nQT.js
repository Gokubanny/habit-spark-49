import { c as reactExports, q as jsxRuntimeExports } from "./worker-entry-C_iL5ijn.js";
import { a as Route, u as useNavigate, t as toast, L as Link } from "./router-ljpxEWYu.js";
import { u as useAuth, B as BottomNav, A as AddHabitSheet } from "./use-auth-DCMEKcse.js";
import { T as Textarea, B as Button } from "./button-C-0_2HCy.js";
import { b as fetchQuestion, c as fetchReplies, t as timeAgo, M as MessageCircle, d as deleteQuestion, r as reportPost, e as postReply, g as deleteReply } from "./community-Cbmup8V2.js";
import { c as createLucideIcon } from "./createLucideIcon-DIdLOON3.js";
import { T as Trash2 } from "./trash-2-CMtlfpIw.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./sparkles-DMB3hRYU.js";
import "./utils-Bz4m9VPB.js";
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
      key: "1jaruq"
    }
  ]
];
const Flag = createLucideIcon("flag", __iconNode);
function QuestionDetailPage() {
  const {
    id
  } = Route.useParams();
  const {
    user,
    isLoading: authLoading
  } = useAuth();
  const navigate = useNavigate();
  const [question, setQuestion] = reactExports.useState(null);
  const [replies, setReplies] = reactExports.useState([]);
  const [body, setBody] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  reactExports.useEffect(() => {
    if (mounted && !authLoading && !user) {
      navigate({
        to: "/login"
      });
    }
  }, [mounted, authLoading, user, navigate]);
  const refresh = reactExports.useCallback(async () => {
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
  reactExports.useEffect(() => {
    refresh();
  }, [refresh]);
  const handleReply = async () => {
    if (!user || body.trim().length < 3) return;
    setSubmitting(true);
    try {
      await postReply(user.id, id, body.trim());
      setBody("");
      await refresh();
      toast.success("Reply posted anonymously");
    } catch (e) {
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
      navigate({
        to: "/questions"
      });
    } catch (e) {
      toast.error(e?.message || "Couldn't delete");
    }
  };
  const handleDeleteReply = async (rid) => {
    if (!confirm("Delete this reply?")) return;
    try {
      await deleteReply(rid);
      await refresh();
    } catch (e) {
      toast.error(e?.message || "Couldn't delete");
    }
  };
  const handleReport = async (targetType, targetId) => {
    if (!user) return;
    try {
      await reportPost(user.id, targetType, targetId);
      toast.success("Thanks — we'll review it.");
    } catch (e) {
      toast.error(e?.message || "Couldn't report");
    }
  };
  if (!mounted || authLoading || !user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-5 pt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/questions", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Back"
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-sm text-muted-foreground py-12", children: "Loading…" }) : !question ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-border/60 py-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Question not found." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-semibold", children: question.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: timeAgo(question.created_at) }),
            question.is_mine && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "· yours" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-foreground leading-snug font-medium", children: question.body }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-4 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
              question.reply_count,
              " ",
              question.reply_count === 1 ? "reply" : "replies"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center gap-3", children: question.is_mine ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleDeleteQuestion, className: "inline-flex items-center gap-1 hover:text-destructive transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
              " Delete"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleReport("question", question.id), className: "inline-flex items-center gap-1 hover:text-foreground transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-3.5 h-3.5" }),
              " Report"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: body, onChange: (e) => setBody(e.target.value.slice(0, 1e3)), placeholder: "Share your reflection (anonymous)…", rows: 4, maxLength: 1e3, className: "resize-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
              body.length,
              "/1000 · anonymous"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: handleReply, disabled: submitting || body.trim().length < 3, children: submitting ? "Posting…" : "Post reply" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: [
            replies.length,
            " ",
            replies.length === 1 ? "Reply" : "Replies"
          ] }),
          replies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-border/60 py-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No replies yet. Be the first." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: replies.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground mb-1.5", children: [
              "Anonymous · ",
              timeAgo(r.created_at),
              r.is_mine && " · you"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap", children: r.body }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex items-center justify-end text-[11px] text-muted-foreground", children: r.is_mine ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDeleteReply(r.id), className: "inline-flex items-center gap-1 hover:text-destructive transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
              " Delete"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleReport("reply", r.id), className: "inline-flex items-center gap-1 hover:text-foreground transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-3 h-3" }),
              " Report"
            ] }) })
          ] }, r.id)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { onAddClick: () => setAddOpen(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddHabitSheet, { open: addOpen, onClose: () => setAddOpen(false), onAdd: () => setAddOpen(false) })
  ] });
}
export {
  QuestionDetailPage as component
};
