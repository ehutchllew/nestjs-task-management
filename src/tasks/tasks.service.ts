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

    public async deleteTaskById(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);

        if (!result.affected) {
            throw new NotFoundException(`Task with ID: "${id}" not found`);
        }
    }

    public async getTaskById(id: string): Promise<Task> {
        const foundTask: Task = await this.tasksRepository.findOne({ id });
        if (!foundTask) {
            throw new NotFoundException(`Task with ID: "${id}" not found`);
        }

        return foundTask;
    }

    public getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto);
    }

    public async updateTaskById(
        updateTaskDto: UpdateTaskDto,
        id: string,
    ): Promise<Task> {
        const foundTask: Task = await this.getTaskById(id);
        await this.tasksRepository.update(foundTask.id, updateTaskDto);
        return { ...foundTask, ...updateTaskDto };
    }
}
