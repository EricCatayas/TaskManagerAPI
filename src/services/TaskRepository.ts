import Task from "../models/Task"

export class TaskRepository {

  private tasks: Task[];

  constructor() {
    this.tasks = [
      { id: 1, title: "Task 1", status: "completed", color: "blue" },
      { id: 2, title: "Task 2", status: "pending", color: "green" },
      { id: 3, title: "Task 3", status: "in-progress", color: "yellow" },
      { id: 4, title: "Task 3", status: "in-progress", color: "purple" },
    ];
  }

  async getAllAsync(): Promise<Task[]> {
    //TODO: mySQL

    return this.tasks;
  }

  async createAsync(task: Task) {
    //TODO: mySQL

    return;
  }

  async deleteAsync(taskId: number) {
    //TODO: mySQL

    return;
  }
}
