import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { UsersRepository } from "./users.repository";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {}

    public async signUpUser(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto);
    }

    public async signIn(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            return "success";
        } else {
            throw new UnauthorizedException(
                "Please check your login credentials",
            );
        }
    }
}
