import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { uuid4 } from "uuid";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public createTask(title: string, description: string): Task {
        const task: Task = {
            title,
            description,
            id: uuid4(),
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    public getAllTasks(): Task[] {
        return this.tasks;
    }
}
