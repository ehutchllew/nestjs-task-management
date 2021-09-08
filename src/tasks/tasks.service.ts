import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./tasks.types";
import { CreateTaskDto } from "./dto/createTask.dto";
import { UpdateTaskDto } from "./dto/updateTaskDto";
import { GetTasksFilterDto } from "./dto/getTasksFilter.dto";
import { TasksRepository } from "./tasks.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) {}

    public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.tasksRepository.create({
            description: createTaskDto.description,
            status: TaskStatus.OPEN,
            title: createTaskDto.title,
        });

        await this.tasksRepository.save(task);

        return task;
    }

    // public deleteTaskById(id: string): void {
    //     const foundTask: Task = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
    // }

    // public getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    public async getTaskById(id: string): Promise<Task> {
        const foundTask = await this.tasksRepository.findOne({ id });
        if (!foundTask) {
            throw new NotFoundException(`Task with ID: "${id}" not found`);
        }

        return foundTask;
    }

    // public getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    //     const { search, status } = filterDto;
    //     let tasks: Task[] = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(
    //             (task) =>
    //                 task.title.includes(search) ||
    //                 task.description.includes(search),
    //         );
    //     }

    //     return tasks;
    // }

    // public updateTaskById(updateTaskDto: UpdateTaskDto, id: string): Task {
    //     let foundTask: Task = this.getTaskById(id);
    //     foundTask = Object.assign(foundTask, updateTaskDto);
    //     return foundTask;
    // }
}
