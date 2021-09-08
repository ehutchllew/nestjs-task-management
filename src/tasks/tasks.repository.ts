import { EntityRepository, Repository } from "typeorm";
import { GetTasksFilterDto } from "./dto/getTasksFilter.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { search, status } = filterDto;

        const queryBuilder = this.createQueryBuilder("task");

        if (status) {
            queryBuilder.andWhere("task.status = :status", { status });
        }

        if (search) {
            queryBuilder.andWhere(
                "LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)",
                { search: `%${search}%` },
            );
        }

        const tasks: Task[] = await queryBuilder.getMany();

        return tasks;
    }
}
