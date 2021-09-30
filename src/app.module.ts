import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "./tasks/tasks.module";
import { AuthModule } from "./auth/auth.module";
import { ErrorHandlerModule } from "./shared/errors/errorHandler";

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "task-management",
            autoLoadEntities: true,
            synchronize: true,
        }),
        AuthModule,
        ErrorHandlerModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
