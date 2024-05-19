import * as db from '../../lib/db.js'
import * as cloudinary from '../../lib/cloudinary.js'

export default async function handler(req, res) {
    const sclient = db.supabase();
    const { data, error } = await sclient.from("test").select("*");
    const asset = await cloudinary.fetch('8a40c0021ae332b52658f009112390ed');
    res.status(200).json({
        db: data,
        cloudinary: asset.secure_url,
    });
}