import createClient from '@/lib/supabase/api'

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).appendHeader('Allow', 'GET').end();
    }
    const supabase = createClient(req, res);
    const user = await supabase.auth.getUser();
    const reply = user.data.user;
    //get account balance
    const {data: acc_data} = await supabase
        .from('balances')
        .select('*')
        .eq('id', user.data.user.id);
    reply.balances = acc_data[0];
    res.status(200).json(user.data.user);
}