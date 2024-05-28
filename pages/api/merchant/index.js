import * as db from '@/lib/db.js';

export default async function handler(req, res) {
    const sclient = await db.getSupabaseClient();

    if (req.method === 'POST') {
        const body = req.body;
        const { data, error } = await sclient
            .from('merchant')
            .insert([body])
            .select();

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(201).json({ data });
    } else if (req.method === 'GET') {
        const { data, error } = await sclient
            .from('merchant')
            .select('*');

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(200).json({ data });
    } else if (req.method === 'PUT') {
        const body = req.body;
        const { merchant_id } = req.query; // Get merchant_id from query params

        const { data, error } = await sclient
            .from('merchant')
            .update(body)
            .eq('merchant_id', merchant_id)
            .select();

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(200).json({ data });
    } else if (req.method === 'DELETE') {
        const { merchant_id } = req.query; // Get merchant_id from query params

        const { data, error } = await sclient
            .from('merchant')
            .delete()
            .eq('merchant_id', merchant_id)
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