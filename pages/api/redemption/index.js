import * as db from '../../../lib/db.js';

export default async function handler(req, res) {
    const sclient = await db.getSupabaseClient();

    if (req.method === 'POST') {
        const body = req.body;
        const { data, error } = await sclient
            .from('redemption')
            .insert([body])
            .select();

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(201).json({ data });
    } else if (req.method === 'GET') {
        const { data, error } = await sclient
            .from('redemption')
            .select('*');

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(200).json({ data });
    } else if (req.method === 'PUT') {
        const body = req.body;
        const { redemption_id } = req.query; // Get redemption_id from query params

        const { data, error } = await sclient
            .from('redemption')
            .update(body)
            .eq('redemption_id', redemption_id)
            .select();

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(200).json({ data });
    } else if (req.method === 'DELETE') {
        const { redemption_id } = req.query; // Get redemption_id from query params

        const { data, error } = await sclient
            .from('redemption')
            .delete()
            .eq('redemption_id', redemption_id)
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