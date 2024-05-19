import mysql from "mysql2";
import dotenv from "dotenv";
import Task from "../models/Task";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TABLE,
  })
  .promise();

export async function getTasks(){
    var [rows] = await pool.query("SELECT * FROM tasks");

    console.log("Database Rows:", rows);

    return rows;
}

export async function createTask(title: string, status: string, color: string) {
  try{
    const result = await pool.query(
      `
          INSERT INTO tasks (title, status, color)
          VALUES (?, ?, ?);
          `,
      [title, status, color]
    );

    console.log("Create Result: ", result);

    return result;
  } catch(error){
    throw error;
  }
}

export async function updateTask(id: number, title:string, status: string, color: string) {

    const result = await pool.query(`
        UPDATE tasks
        SET title = ?,
            status = ?,
            color = ?
        WHERE id = ?;
        `,
      [title, status, color, id]
    );

    console.log("Update result: ", result);

    return result;
}
export async function deleteTask(id: number) {

    await pool.query(`
        DELETE FROM tasks
        WHERE id = ?
        `,
      [id]
    );

    return;
}