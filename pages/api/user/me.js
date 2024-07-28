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

    //award onboarding bonus
    if (!acc_data[0]){
        const {data: acc_data} = await supabase
            .from("balances")
            .insert([{id: user.data.user.id}])
            .select();
        reply.balances = acc_data[0];
        await supabase
            .from("recycling")
            .insert([{
                user_id: user.data.user.id,
                status: 1,
                txn_type: 88,
                description: "Welcome Bonus",
                points_awarded: reply.balances.current_points}])
            .select();
    } else {
        //calculate rank
        const { data: count } = await supabase
            .from('balances')
            .select('current_points')
            .gte('current_points', reply.balances.current_points);
        reply.balances.current_ranking = count.length;
        if (reply.balances.highest_ranking == null || count.length < reply.balances.highest_ranking){
            reply.balances.highest_ranking = count.length;
            await supabase
                .from('balances')
                .update({ highest_ranking: count.length })
                .eq('id', reply.balances.id)
                .select();
        }
    }
    res.status(200).json(reply);
}