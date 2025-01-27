import express from "express";
import db from "../model/helper.js";

var router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.get("/todos", async (req, res) => {
  // Send back the full list of items
  try {
    const result = await db("SELECT * FROM items ORDER BY id ASC;");
    res.status(200).send(result.data);
  } catch (err) {
    consolw.error(err);
    res.status(500).send({ error: "Failed to fetch todos" });
  }
});

router.post("/todos", async (req, res) => {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of items
  // Add your code here
  //
  const { text } = req.body;
  try {
    //INSTERT INTO items (text, complete) VALUES ('cook', 0);
    await db(`INSERT INTO items (text, complete) VALUES ('${text}', 0);`);

    //get the data
    const result = await db("SELECT * FROM items ORDER BY id ASC;");
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/todos/:todo_id", async (req, res) => {
  // The request's body is available in req.body
  // URL params are available in req.params
  // If the query is successfull you should send back the full list of items
  // Add your code here
  //
  const { todo_id } = req.params;
  const { text, complete } = req.body;

  if (!text && !complete) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  try {
    let query = `UPDATE items SET `;
    const updates = [];
    if (text) {
      updates.push(`text = '${text}'`);
    }
    if (complete !== undefined) updates.push(`complete = ${complete}`);
    query += updates.join(", ");
    query += ` WHERE id = ${todo_id};`;

    await db(query);

    const result = await db("SELECT * FROM items ORDER BY id ASC;");
    res.status(200).send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to update todo" });
  }
});

router.delete("/todos/:todo_id", async (req, res) => {
  // URL params are available in req.params
  // Add your code here
  //
  try {
    await db(`DELETE FROM items WHERE id = ${req.params.todo_id};`);

    const result = await db("SELECT * FROM items ORDER BY id ASC;");
    res.status(200).send(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to delete todo" });
  }
});

export default router;
