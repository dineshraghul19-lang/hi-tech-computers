import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://althboljbntlqpquhnwy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsdGhib2xqYm50bHBxcXVobnd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzMTgzNDgsImV4cCI6MjEwNDg5NDM0OH0.vB3UR_Bferm-gQhLm_WjEs75jLT7ecSga0q9a_Z-3IE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
