import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 as uuid4 } from "uuid";
import { CreateTaskDto } from "./dto/createTask.dto";
import { UpdateTaskDto } from "./dto/updateTaskDto";
import { GetTasksFilterDto } from "./dto/getTasksFilter.dto";

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
        const foundTask: Task = this.getTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
    }

    public getAllTasks(): Task[] {
        return this.tasks;
    }

    public getTaskById(id: string): Task {
        const foundTask = this.tasks.find((task) => task.id === id);

        if (!foundTask) {
            throw new NotFoundException();
        }

        return foundTask;
    }

    public getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
        const { search, status } = filterDto;
        let tasks: Task[] = this.getAllTasks();

        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(
                (task) =>
                    task.title.includes(search) ||
                    task.description.includes(search),
            );
        }

        return tasks;
    }

    public updateTaskById(updateTaskDto: UpdateTaskDto, id: string): Task {
        let foundTask: Task = this.getTaskById(id);
        foundTask = Object.assign(foundTask, updateTaskDto);
        return foundTask;
    }
}
