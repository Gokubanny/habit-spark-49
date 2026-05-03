CREATE TABLE public.spark_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  spark_type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  answer TEXT,
  visited BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);

ALTER TABLE public.spark_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own spark entries"
  ON public.spark_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own spark entries"
  ON public.spark_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own spark entries"
  ON public.spark_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users delete own spark entries"
  ON public.spark_entries FOR DELETE
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_spark_entries_updated_at
  BEFORE UPDATE ON public.spark_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_spark_entries_user_date ON public.spark_entries(user_id, date DESC);