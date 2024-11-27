import { GetUserProfileUseCase } from "../get-user-profile";
import { PrismaUsersRepository } from "@/repository/prisma/prisma.user.repository";

export function makeGetUserProfileUseCase() {
    const userRepository = new PrismaUsersRepository
    const useCase = new GetUserProfileUseCase(userRepository);

    return useCase;
}