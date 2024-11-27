import { PrismaGymRepository } from "@/repository/prisma/prisma.gym.repository";
import { FetchNearGymsUseCase } from "../fetch-near-gyms";

export function makeFetchNearGymsUseCase() {
    const gymRepository = new PrismaGymRepository
    const useCase = new FetchNearGymsUseCase(gymRepository);

    return useCase;
}