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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = mysql2_1.default
    .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TABLE,
})
    .promise();
function getTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        var [rows] = yield pool.query("SELECT * FROM tasks");
        console.log("Database Rows:", rows);
        return rows;
    });
}
exports.getTasks = getTasks;
function createTask(title, status, color) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query(`
          INSERT INTO tasks (title, status, color)
          VALUES (?, ?, ?);
          `, [title, status, color]);
            console.log("Create Result: ", result);
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.createTask = createTask;
function updateTask(id, title, status, color) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query(`
        UPDATE tasks
        SET title = ?,
            status = ?,
            color = ?
        WHERE id = ?;
        `, [title, status, color, id]);
        console.log("Update result: ", result);
        return result;
    });
}
exports.updateTask = updateTask;
function deleteTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pool.query(`
        DELETE FROM tasks
        WHERE id = ?
        `, [id]);
        return;
    });
}
exports.deleteTask = deleteTask;
