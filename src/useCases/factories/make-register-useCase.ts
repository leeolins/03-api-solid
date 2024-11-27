import { RegisterUseCase } from "@/useCases/register";
import { PrismaUsersRepository } from "../../repository/prisma/prisma.user.repository";

export function makeRegisterUseCase() {
    const userRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(userRepository);
    return registerUseCase;
}