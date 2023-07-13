// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pool = require("./db");

import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

const port = process.env.PORT ;

const app = express();
app.use(cors());
app.use(express.json());



const db = new Pool({
  connectionString: process.env.DB_URL||8805,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
});

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todos

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todos

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todos_id = $2",
      [description, id]
    );

    res.json("Todos was updated!");
  } catch (err) {
    console.error(err.message);
  }
});


//delete a todos

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todos WHERE todo_id = $1", [
      id
    ]);
    res.json("Todos was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
 

// app.listen(5002, () => {
//   console.log("server has started on port 5002");
// });

app.listen(port, () => {
  console.log("Connected to backend.");
});