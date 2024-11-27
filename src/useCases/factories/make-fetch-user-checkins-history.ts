import { PrismaCheckinRepository } from "@/repository/prisma/prisma.checkin.repository";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-checkins-history";

export function makeFetchUserCheckInsHistoryUseCase() {
    const checkInRepository = new PrismaCheckinRepository
    const useCase = new FetchUserCheckInsHistoryUseCase(checkInRepository);

    return useCase;
}