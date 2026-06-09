
-- Ensure no read access for anon/public on quote_requests
REVOKE SELECT, UPDATE, DELETE ON public.quote_requests FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.quote_requests FROM PUBLIC;
REVOKE ALL ON public.quote_requests FROM authenticated;

-- Allow only INSERT for anon (public submissions); service_role retains full access
GRANT INSERT ON public.quote_requests TO anon;
GRANT ALL ON public.quote_requests TO service_role;

-- Replace the permissive "WITH CHECK (true)" INSERT policy with one that validates input
DROP POLICY IF EXISTS "Anyone can submit a quote" ON public.quote_requests;

CREATE POLICY "Public can submit validated quotes"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND char_length(phone) BETWEEN 7 AND 30
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(vehicle) BETWEEN 1 AND 150
  AND (tire_size IS NULL OR char_length(tire_size) <= 100)
  AND (tpms_notes IS NULL OR char_length(tpms_notes) <= 300)
  AND (message IS NULL OR char_length(message) <= 1000)
);
