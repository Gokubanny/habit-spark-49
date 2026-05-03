-- Questions
CREATE TABLE public.community_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('Fitness','Reading','Mindfulness','Sleep','Nutrition','Focus','Other')),
  body TEXT NOT NULL CHECK (char_length(body) BETWEEN 3 AND 280),
  reply_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_community_questions_created ON public.community_questions(created_at DESC);
CREATE INDEX idx_community_questions_category ON public.community_questions(category, created_at DESC);
CREATE INDEX idx_community_questions_user ON public.community_questions(user_id, created_at DESC);

ALTER TABLE public.community_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read questions"
  ON public.community_questions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users insert own questions"
  ON public.community_questions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own questions"
  ON public.community_questions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Replies
CREATE TABLE public.community_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.community_questions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL CHECK (char_length(body) BETWEEN 3 AND 1000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_community_replies_question ON public.community_replies(question_id, created_at DESC);
CREATE INDEX idx_community_replies_user ON public.community_replies(user_id, created_at DESC);

ALTER TABLE public.community_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read replies"
  ON public.community_replies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users insert own replies"
  ON public.community_replies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own replies"
  ON public.community_replies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Reports
CREATE TABLE public.community_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('question','reply')),
  target_id UUID NOT NULL,
  reason TEXT CHECK (reason IS NULL OR char_length(reason) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_community_reports_target ON public.community_reports(target_type, target_id);

ALTER TABLE public.community_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert own reports"
  ON public.community_reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reporter_id);
-- No SELECT/UPDATE/DELETE policies => no client access for reading reports.

-- Reply count trigger
CREATE OR REPLACE FUNCTION public.bump_question_reply_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_questions
      SET reply_count = reply_count + 1
      WHERE id = NEW.question_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_questions
      SET reply_count = GREATEST(reply_count - 1, 0)
      WHERE id = OLD.question_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.bump_question_reply_count() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER community_replies_count_ins
  AFTER INSERT ON public.community_replies
  FOR EACH ROW EXECUTE FUNCTION public.bump_question_reply_count();

CREATE TRIGGER community_replies_count_del
  AFTER DELETE ON public.community_replies
  FOR EACH ROW EXECUTE FUNCTION public.bump_question_reply_count();