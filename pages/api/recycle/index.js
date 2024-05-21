import * as db from '../../../lib/db.js';

// Create
export default async function handler(req, res) {
    const sclient = await db.getSupabaseClient();

    if (req.method === 'POST') {
        const body = req.body;
        const { data, error } = await sclient
            .from('recycling')
            .insert([body])
            .select();

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(201).json({ data });
    } else if (req.method === 'GET') {
        const { data, error } = await sclient
            .from('recycling')
            .select('*');

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(200).json({ data });
    } else if (req.method === 'PUT') {
        const body = req.body;
        const { submission_id } = req.query;

        const { data, error } = await sclient
            .from('recycling')
            .update(body)
            .eq('submission_id', submission_id)
            .select();

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.status(200).json({ data });
    } else if (req.method === 'DELETE') {
        const { submission_id } = req.query;

        const { data, error } = await sclient
            .from('recycling')
            .delete()
            .eq('submission_id', submission_id)
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