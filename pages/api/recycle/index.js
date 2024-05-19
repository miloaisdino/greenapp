import * as db from '../../../lib/db.js'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const sclient = db.supabase();
    const body = req.body;
    const { data, error } = await sclient
        .from('recycling')
        .insert([
            body,
        ])
        .select()
    res.status(200).json({
        db: data,
    });
}