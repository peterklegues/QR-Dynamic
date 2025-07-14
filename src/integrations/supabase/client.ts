import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jjuebyswsstwdcjmcpsg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqdWVieXN3c3N0d2Rjam1jcHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNzYyODksImV4cCI6MjA2Mjg1MjI4OX0.nWq7n38ZQvbJWivTEiGuSUzzYY3qnm4WAOzIwRuD768';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);