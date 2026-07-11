import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase Environment Variables inside .env.local Configuration');
}

// Global, type-safe standard instance wrapper for public read actions
export const supabase = createClient(supabaseUrl, supabaseAnonKey);