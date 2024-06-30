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
      .from("recycling")
      .insert([body])
      .select();

    //get account balance
    const { data: acc_data } = await sclient
      .from("balances")
      .select("*")
      .eq("id", id);
    const acc = acc_data[0];
    if (acc?.id !== id) {
      res.status(500).json({ error: "Insufficient funds" });
      return; //DO NOT REMOVE
    }

    //update balance
    acc.current_points += body.points_awarded;
    const { error: error2 } = await sclient
      .from("balances")
      .update([acc])
      .select()
      .eq("id", id);

    if (error || error2) {
      res.status(500).json({ error: error?.message || error2?.message });
      return;
    }
    res.status(201).json({ data });
  } else if (req.method === "GET") {
    const { data, error } = await sclient
      .from("recycling")
      .select()
      .eq("user_id", id);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json({ data });
  } else if (req.method === "PUT") {
    const body = req.body;
    const { submission_id } = req.query;
    if (id !== body.user_id) {
      res.status(500).json({ error: "access denied" });
    }

    const { data, error } = await sclient
      .from("recycling")
      .update(body)
      .select()
      .eq("submission_id", submission_id)
      .eq("user_id", id);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json({ data });
  } else if (req.method === "DELETE") {
    const { submission_id } = req.query;
    if (id !== body.user_id) {
      res.status(500).json({ error: "access denied" });
    }

    const { data, error } = await sclient
      .from("recycling")
      .delete()
      .eq("submission_id", submission_id)
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
