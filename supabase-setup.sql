-- Run this in the Supabase SQL Editor (Database → SQL Editor → New query)

-- 1. Create the diary table
create table if not exists diary (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  entries jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, date)
);

-- 2. Enable Row Level Security (keeps each user's data private)
alter table diary enable row level security;

-- 3. Policy: users can only read their own diary
create policy "Users can read own diary"
  on diary for select
  using (auth.uid() = user_id);

-- 4. Policy: users can insert their own diary entries
create policy "Users can insert own diary"
  on diary for insert
  with check (auth.uid() = user_id);

-- 5. Policy: users can update their own diary entries
create policy "Users can update own diary"
  on diary for update
  using (auth.uid() = user_id);

-- 6. Policy: users can delete their own diary entries
create policy "Users can delete own diary"
  on diary for delete
  using (auth.uid() = user_id);
