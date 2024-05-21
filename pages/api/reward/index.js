import * as db from '../../../lib/db.js';

export default async function handler(req, res) {
    const sclient = await db.getSupabaseClient();

    if (req.method === 'POST') {
        const body = req.body;
        const { data, error } = await sclient
            .from('reward')
            .insert([body])
            .select();

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(201).json({ data });
    } else if (req.method === 'GET') {
        const { data, error } = await sclient
            .from('reward')
            .select('*');

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(200).json({ data });
    } else if (req.method === 'PUT') {
        const body = req.body;
        const { reward_id } = req.query; // Get reward_id from query params

        const { data, error } = await sclient
            .from('reward')
            .update(body)
            .eq('reward_id', reward_id)
            .select();

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(200).json({ data });
    } else if (req.method === 'DELETE') {
        const { reward_id } = req.query; // Get reward_id from query params

        const { data, error } = await sclient
            .from('reward')
            .delete()
            .eq('reward_id', reward_id)
            .select();

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(204).send();
    } else {
        res.status(405).send({ message: 'Method Not Allowed' });
    }
}