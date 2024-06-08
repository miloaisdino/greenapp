import * as db from "../../lib/db.js";
import * as cloudinary from "../../lib/cloudinary.js";

export default async function handler(req, res) {
  const sclient = db.supabase();
  const { data, error } = await sclient.from("test").select("*");
  const asset = await cloudinary.fetch("samples/upscale-face-1");
  res.status(200).json({
    db: data,
    cloudinary: asset.secure_url,
  });
}
