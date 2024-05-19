"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database/database");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// build command: npx tsc
// run command: node dist/app.js
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// fetch("http://localhost:3000/api/tasks", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ title: "New Task", description: "Task Description" }),
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error("Error:", error));
app.get("/api/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //var tasks = await taskRepository.getAllAsync();
        var result = yield (0, database_1.getTasks)();
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
}));
app.post("/api/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTask = req.body;
        console.log(newTask);
        const { title, status, color } = newTask;
        yield (0, database_1.createTask)(title, status, color);
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
}));
app.put("/api/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const updatedTask = req.body;
    const { title, status, color } = updatedTask;
    if (isNaN(id)) {
        res.status(400).send({ error: "Invalid ID format" });
        return;
    }
    yield (0, database_1.updateTask)(id, title, status, color);
    res.status(201).json(updatedTask);
}));
app.delete("/api/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    yield (0, database_1.deleteTask)(id);
    res.status(201);
}));
// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
