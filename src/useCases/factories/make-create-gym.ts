import { PrismaGymRepository } from "@/repository/prisma/prisma.gym.repository";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
    const gymRepository = new PrismaGymRepository
    const useCase = new CreateGymUseCase(gymRepository);

    return useCase;
}