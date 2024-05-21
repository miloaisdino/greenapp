import { createClient } from '@supabase/supabase-js'

export function supabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_PRIVATE_KEY;
    return createClient(supabaseUrl, supabaseKey);
}

let sclient = null;
export async function getSupabaseClient() {
    if (!sclient) {
        sclient = supabase();
    }
    return sclient;
}