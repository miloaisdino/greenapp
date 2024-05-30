import * as db from "@/lib/db.js";

export default async function handler(req, res) {
  const sclient = await db.getSupabaseClient();
  const { id } = req.query;

  if (req.method === "POST") {
    const body = req.body;
    if (id !== body.user_id) {
      res.status(500).json({ error: "access denied" });
    }
    const { data, error } = await sclient
      .from("redemption")
      .insert([body])
      .select();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(201).json({ data });
  } else if (req.method === "GET") {
    const { data, error } = await sclient
      .from("redemption")
      .select()
      .eq("user_id", id);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json({ data });
  } else if (req.method === "PUT") {
    const body = req.body;
    const { redemption_id } = req.query;
    if (id !== body.user_id) {
      res.status(500).json({ error: "access denied" });
    }

    const { data, error } = await sclient
      .from("redemption")
      .update(body)
      .select()
      .eq("redemption_id", redemption_id)
      .eq("user_id", id);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json({ data });
  } else if (req.method === "DELETE") {
    const { redemption_id } = req.query;
    if (id !== body.user_id) {
      res.status(500).json({ error: "access denied" });
    }

    const { data, error } = await sclient
      .from("redemption")
      .delete()
      .eq("redemption_id", redemption_id)
      .eq("user_id", id);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(204).send();
  } else {
    res.status(405).send({ message: "Method Not Allowed" });
  }
}
