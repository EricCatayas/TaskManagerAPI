
import express, { Request, Response } from "express";
const { TaskRepository } = require("./services/TaskRepository");
import cors from 'cors'; 

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// build command: npx tsc
// run command: node dist/app.js

var taskRepository = new TaskRepository();


app.get("/api/tasks", async (req: Request, res: Response) => {
    try{

        var tasks = await taskRepository.getAllAsync();
        res.json(tasks);

    } 
    catch(error){
        console.log(error);
    }
});

app.post("/api/tasks", async (req: Request, res: Response) => {
  const newTask = req.body
  console.log(newTask);
  await taskRepository.createAsync(newTask);
  res.status(201).json(newTask); 
});

app.put("/api/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedTask = req.body; // Assuming req.body contains the updated resource data
  
//   const index = resources.findIndex((r) => r.id === id);
//   if (index === -1) {
//     return res.status(404).json({ error: "Resource not found" });
//   }

  res.status(201).json(updatedTask);
});

app.delete("/api/tasks/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  await taskRepository.deleteAsync(id);
  res.status(201);
});


// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
