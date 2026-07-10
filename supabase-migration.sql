-- Run this in Supabase SQL Editor
-- Supabase dashboard → SQL Editor → New query → paste & run

CREATE TABLE IF NOT EXISTS registrations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  gender text,
  address text NOT NULL,
  phone text NOT NULL,
  email text,
  country text,
  city text,
  church_name text,
  prev_retreat text,
  special_needs text,
  accepted_rules boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for all" ON registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select for service" ON registrations
  FOR SELECT USING (true);

CREATE POLICY "Allow update for service" ON registrations
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete for service" ON registrations
  FOR DELETE USING (true);
