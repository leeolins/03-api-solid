import { CheckInUseCase } from "../check-in";
import { PrismaCheckinRepository } from "@/repository/prisma/prisma.checkin.repository";
import { PrismaGymRepository } from "@/repository/prisma/prisma.gym.repository";

export function makeCheckInUseCase() {
    const checkInRepository = new PrismaCheckinRepository
    const gymRepository = new PrismaGymRepository
    const useCase = new CheckInUseCase(checkInRepository, gymRepository);

    return useCase;
}