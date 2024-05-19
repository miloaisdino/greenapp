import { createClient } from '@supabase/supabase-js'

export function supabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_PRIVATE_KEY;
    return createClient(supabaseUrl, supabaseKey);
}