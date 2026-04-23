import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://panssaghpbilpiwbsdvy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbnNzYWdocGJpbHBpd2JzZHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NTAxMzcsImV4cCI6MjA5MjUyNjEzN30.PRmOuEAFJ0m2mEFye0f0sesAeRIUH761eUstKMHaySg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
