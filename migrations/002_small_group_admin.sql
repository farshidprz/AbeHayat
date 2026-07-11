-- Small-group admin management tables
CREATE TABLE IF NOT EXISTS managed_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  gender text,
  phone text NOT NULL,
  email text,
  country text,
  city text,
  church_name text,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('manager', 'assistant', 'member')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS small_groups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  manager_ids text[] NOT NULL DEFAULT '{}',
  assistant_ids text[] NOT NULL DEFAULT '{}',
  member_ids text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE managed_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE small_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for all" ON managed_users
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select for service" ON managed_users
  FOR SELECT USING (true);
CREATE POLICY "Allow update for service" ON managed_users
  FOR UPDATE USING (true);
CREATE POLICY "Allow delete for service" ON managed_users
  FOR DELETE USING (true);

CREATE POLICY "Allow insert for all" ON small_groups
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select for service" ON small_groups
  FOR SELECT USING (true);
CREATE POLICY "Allow update for service" ON small_groups
  FOR UPDATE USING (true);
CREATE POLICY "Allow delete for service" ON small_groups
  FOR DELETE USING (true);

CREATE INDEX IF NOT EXISTS idx_managed_users_role ON managed_users(role);
CREATE INDEX IF NOT EXISTS idx_small_groups_name ON small_groups(name);
