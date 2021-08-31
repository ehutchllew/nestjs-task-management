import { Task, TaskStatus } from "../task.model";

export class UpdateTaskDto implements Partial<Task> {
    description?: string;
    title?: string;
    status?: TaskStatus;
}
