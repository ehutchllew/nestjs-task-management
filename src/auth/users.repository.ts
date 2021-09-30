import {
    ConflictException,
    InternalServerErrorException,
} from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    public async createUser(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username, password: hashedPassword });

        try {
            await this.save(user);
        } catch (e) {
            if (e.code === "23505") {
                // DUPE USERNAME
                throw new ConflictException("Username already exists");
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
