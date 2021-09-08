import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from "@nestjs/common";
import { CreateTaskDto } from "./dto/createTask.dto";
import { GetTasksFilterDto } from "./dto/getTasksFilter.dto";
import { UpdateTaskDto } from "./dto/updateTaskDto";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    public createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    // @Delete(":id")
    // public deleteTaskById(@Param() params): void {
    //     return this.tasksService.deleteTaskById(params.id);
    // }

    // @Get()
    // public getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getTasksWithFilter(filterDto);
    //     }
    //     return this.tasksService.getAllTasks();
    // }

    @Get(":id")
    public getTaskById(@Param() params): Promise<Task> {
        return this.tasksService.getTaskById(params.id);
    }

    // @Patch(":id")
    // public updateTaskById(
    //     @Body() updateTaskDto: UpdateTaskDto,
    //     @Param() params,
    // ): Task {
    //     return this.tasksService.updateTaskById(updateTaskDto, params.id);
    // }
}
