import createClient from '@/lib/supabase/api'

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).appendHeader('Allow', 'GET').end();
    }
    const supabase = createClient(req, res);
    const user = await supabase.auth.getUser();
    res.status(200).json(user.data.user);
}