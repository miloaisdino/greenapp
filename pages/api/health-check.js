import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error} = await supabase.from("test").select("*");
    res.status(200).json({ message: data });
}