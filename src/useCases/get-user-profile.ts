import { prisma } from "@/lib/prisma";
import { UsersInterface } from "@/repository/IUser";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-erro";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetUserProfileUseCaseRequest {
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    /**
     *
     */
    constructor(public UserRepository: UsersInterface) { }

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        //const password_hash = await hash(password, 6);

        const user = await this.UserRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFoundError();
        }

        // const userRepository = new PrismaUsersRepository();

        return {
            user
        }
    }
}
