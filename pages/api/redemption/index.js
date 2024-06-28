import * as db from '@/lib/db.js';
import createClient from '@/lib/supabase/api'
import * as mailer from '@/lib/mailer.js'

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
            .select('*')
            .eq('reward_id', body.reward_id);
        const reward = reward_data[0];
        if (reward.reward_id !== body.reward_id) {
            res.status(500).json({error: "Reward no longer exists"});
            return; //DO NOT REMOVE
        }

        //get account balance
        const {data: acc_data} = await sclient
            .from('balances')
            .select('*')
            .eq('id', user_id);
        const acc = acc_data[0];
        if (acc?.id !== user_id || acc.current_points < reward.points_cost) {
            res.status(500).json({error: "Insufficient funds"});
            return; //DO NOT REMOVE
        }

        //create redemption entry
        const redeem_code = mailer.codegen();
        const row = {
            'user_id': user_id,
            'reward_id': reward.reward_id,
            'debit': reward.points_cost,
            'status': 0, //not yet claimed or emailed to user
            'quantity': 1,
            'redeem_code': redeem_code
        }
        const { data: rdata, error } = await sclient
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

        //send email
        let mailSuccess = await mailer.send({
            to: user.data.email,
            subject: 'Redemption Voucher - ' + reward.name,
            text: '===== Redemption Voucher =====\n' +
                'Item: ' + reward.name + '\n' +
                'Date: ' + rdata[0].redemption_date + '\n' +
                'Redemption Code: ' + redeem_code + '\n' +
                'Thank you for using GreenApp!'
        });

        if (error || error2 || !mailSuccess) {
            res.status(500).json({ error: error?.message || error2?.message });
            return;
        }

        //update recycling statement
        await sclient
            .from("recycling")
            .insert([{
                user_id: user.data.user.id,
                status: 1,
                description: "Redemption: " + reward.name,
                image_url: reward.image_url,
                submission_date: rdata[0].redemption_date,
                txn_type: 99,
                custom_key: rdata[0].redemption_id,
                points_awarded: -reward.points_cost}])
            .select();

        res.status(201).json({ rdata });
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