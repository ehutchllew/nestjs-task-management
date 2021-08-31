import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 as uuid4 } from "uuid";
import { CreateTaskDto } from "./dto/createTask.dto";
import { UpdateTaskDto } from "./dto/updateTaskDto";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public createTask(createTaskDto: CreateTaskDto): Task {
        const task: Task = {
            title: createTaskDto.title,
            description: createTaskDto.description,
            id: uuid4(),
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    public deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    public getAllTasks(): Task[] {
        return this.tasks;
    }

    public getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id);
    }

    public updateTaskById(updateTaskDto: UpdateTaskDto, id: string): Task {
        let foundTask: Task = this.getTaskById(id);
        foundTask = Object.assign(foundTask, updateTaskDto);
        return foundTask;
    }
}
