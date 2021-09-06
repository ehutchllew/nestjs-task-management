import { IsEnum } from "class-validator";
import { Task, TaskStatus } from "../task.model";

export class UpdateTaskDto implements Partial<Task> {
    description?: string;
    title?: string;

    @IsEnum(TaskStatus)
    status?: TaskStatus;
}
