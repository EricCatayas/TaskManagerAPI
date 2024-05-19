
import express, { Request, Response } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "./database/database";
import cors from 'cors'; 
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;


const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/tasks", async (req: Request, res: Response) => {
    try{

        //var tasks = await taskRepository.getAllAsync();
        var result = await getTasks();
        res.json(result);

    } 
    catch(error){
        console.log(error);
    }
});

app.post("/api/tasks", async (req: Request, res: Response) => {
  try{
    const newTask = req.body
    console.log(newTask);
    const { title, status, color } = newTask;

    await createTask(title, status, color);

    res.status(201).json(newTask); 

  } catch(error:any) {
    res.status(400).send({ error: error.message });
  }
  
});

app.put("/api/tasks/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updatedTask = req.body;
  
  const { title, status, color } = updatedTask;

  if (isNaN(id)) {
    res.status(400).send({ error: "Invalid ID format" });
    return;
  }

  await updateTask(id, title, status, color);

  res.status(201).json(updatedTask);
});

app.delete("/api/tasks/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await deleteTask(id);

  res.status(201);
});


// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
