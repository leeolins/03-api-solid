import { PrismaCheckinRepository } from "@/repository/prisma/prisma.checkin.repository";
import { ValidateCheckInUseCase } from "../validate-checkIn";

export function makeValidateCheckInUseCase() {
    const checkInRepository = new PrismaCheckinRepository
    const useCase = new ValidateCheckInUseCase(checkInRepository);

    return useCase;
}