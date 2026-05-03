import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES, type Category } from "@/lib/community";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (category: Category, body: string) => Promise<void>;
  defaultCategory: Category;
}

export function AskQuestionSheet({ open, onClose, onSubmit, defaultCategory }: Props) {
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<Category>(defaultCategory);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (body.trim().length < 3) return;
    setSubmitting(true);
    try {
      await onSubmit(category, body.trim());
      setBody("");
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader className="text-left">
          <SheetTitle>Ask the community</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4 pb-6">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
              Category
            </label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
              Your question
            </label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value.slice(0, 280))}
              placeholder="What are you curious about? (anonymous)"
              rows={4}
              maxLength={280}
              className="resize-none"
            />
            <div className="text-right text-[11px] text-muted-foreground mt-1">
              {body.length}/280
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Posts are anonymous — no usernames are shown to anyone.
          </p>
          <Button
            onClick={handleSubmit}
            disabled={submitting || body.trim().length < 3}
            className="w-full"
          >
            {submitting ? "Posting…" : "Post anonymously"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
