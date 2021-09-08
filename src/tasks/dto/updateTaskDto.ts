import { IsEnum } from "class-validator";
import { Task } from "../task.entity";
import { TaskStatus } from "../tasks.types";

export class UpdateTaskDto implements Partial<Task> {
    description?: string;
    title?: string;

    @IsEnum(TaskStatus)
    status?: TaskStatus;
}
