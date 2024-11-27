import { PrismaCheckinRepository } from "@/repository/prisma/prisma.checkin.repository";
import { GetCheckInMetricsUseCase } from "../get-checkin-metrics";

export function makeGetCheckinMetricsUseCase() {
    const checkInRepository = new PrismaCheckinRepository
    const useCase = new GetCheckInMetricsUseCase(checkInRepository);

    return useCase;
}