import { Body, Controller, Get, Post } from "@nestjs/common";
import { Task } from "./task.model";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    public createTask(@Body() body: Partial<Task>): Task {
        return this.tasksService.createTask(body.title, body.description);
    }

    @Get()
    public getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }
}
