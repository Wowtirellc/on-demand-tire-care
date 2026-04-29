
CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  vehicle text NOT NULL,
  tire_size text,
  tpms_needed boolean NOT NULL DEFAULT false,
  tpms_notes text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon/auth) to submit a quote
CREATE POLICY "Anyone can submit a quote"
  ON public.quote_requests
  FOR INSERT
  WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies = nobody can read via anon/auth API
-- Only service role (used in edge function or owner) can read.
