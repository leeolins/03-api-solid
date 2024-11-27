import { PrismaGymRepository } from "@/repository/prisma/prisma.gym.repository";
import { SearchGymsUseCase } from "../search-gyms";

export function makeSearchGymsUseCase() {
    const gymRepository = new PrismaGymRepository
    const useCase = new SearchGymsUseCase(gymRepository);

    return useCase;
}