import * as db from '@/lib/db.js';
import createClient from '@/lib/supabase/api'

export default async function handler(req, res) {
    const sclient = createClient(req, res);
    const user = await sclient.auth.getUser();
    const body = req.body;
    if (!user.data.user) {
        res.status(500).json({ error: "access denied" });
    }
    const user_id = user.data.user.id;

    if (req.method === 'POST') {
        //get reward details
        const {data: reward_data} = await sclient
            .from('reward')
            .select('reward_id, points_cost, available_quantity')
            .eq('reward_id', body.reward_id);
        const reward = reward_data[0];
        if (reward.reward_id !== body.reward_id) res.status(500).json({error: "Reward no longer exists"});

        //get account balance
        const {data: acc_data} = await sclient
            .from('balances')
            .select('*')
            .eq('id', user_id);
        const acc = acc_data[0];
        if (acc?.id !== user_id || acc.current_points < reward.points_cost)
            res.status(500).json({error: "Insufficient funds"});

        //create redemption entry
        const row = {
            'user_id': user_id,
            'reward_id': reward.reward_id,
            'debit': reward.points_cost,
            'status': 0, //not yet claimed or emailed to user
            'quantity': 1,
        }
        const { data, error } = await sclient
            .from('redemption')
            .insert([row])
            .select();

        //deduct balance
        acc.current_points -= reward.points_cost;
        const { error: error2 } = await sclient
            .from("balances")
            .update([acc])
            .select()
            .eq("id", user_id);

        if (error || error2) {
            res.status(500).json({ error: error?.message || error2?.message });
            return;
        }

        res.status(201).json({ data });
    } else if (req.method === 'GET') {
        const { data, error } = await sclient
            .from('redemption')
            .select()
            .eq("user_id", user_id);

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(200).json({ data });
    } else {
        res.status(405).send({ message: 'Method Not Allowed' });
    }
}