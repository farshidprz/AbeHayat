-- Migration: 001_create_registrations
-- Description: Initial registrations table with RLS
-- Run in: Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.registrations (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name    text        NOT NULL,
  last_name     text        NOT NULL,
  gender        text,
  address       text        NOT NULL,
  phone         text        NOT NULL,
  email         text,
  country       text,
  city          text,
  church_name   text,
  prev_retreat  text,
  special_needs text,
  accepted_rules boolean    DEFAULT true,
  created_at    timestamptz DEFAULT now()
);

-- Grant schema access
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Only INSERT is open to anon (public registration)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert"
  ON public.registrations FOR INSERT
  WITH CHECK (true);

-- SELECT / UPDATE / DELETE: service_role bypasses RLS automatically
-- No extra policies needed for those operations

NOTIFY pgrst, 'reload schema';
