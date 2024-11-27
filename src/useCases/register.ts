import { prisma } from "@/lib/prisma";
import { UsersInterface } from "@/repository/IUser";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-erro";
import { User } from "@prisma/client";

interface registerUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

interface registerUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    /**
     *
     */
    constructor(public UserRepository: UsersInterface) { }

    async execute({ name, email, password }: registerUseCaseRequest): Promise<registerUseCaseResponse> {
        const password_hash = await hash(password, 6);

        const userExists = await this.UserRepository.findByEmail(email)

        if (userExists) {
            throw new UserAlreadyExistsError();
        }

        // const userRepository = new PrismaUsersRepository();

        const user = await this.UserRepository.create({
            name,
            email,
            password_hash,
        });

        return {
            user
        }
    }
}
