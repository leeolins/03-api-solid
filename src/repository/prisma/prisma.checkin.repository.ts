import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsInterface } from "../ICheckIn";
import { prisma } from "@/lib/prisma";

export class PrismaCheckinRepository implements CheckInsInterface {
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data,
        })

        return checkIn;
    }

    async findCheckInSameDayByUserId(user_id: string, date: Date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);  // Sets the start of the day

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);  // Sets the end of the day

        const checkIns = prisma.checkIn.findFirst({
            where: {
                created_at: {
                    gte: startOfDay.toString(),
                    lte: endOfDay.toString()
                }
            }
        })

        return checkIns
    }

    async fetchUserCheckInsHistoryByUserId(userId: string, page: number) {
        const checkIns = prisma.checkIn.findMany({
            where: {
                id: userId
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return checkIns
    }

    async countUserCheckins(userId: string) {
        const count = prisma.checkIn.count({
            where: {
                id: userId
            }
        })

        return count
    }

    async findById(checkInId: string) {
        const checkIn = prisma.checkIn.findUnique({
            where: {
                id: checkInId
            }
        })

        return checkIn
    }

    async save(CheckIn: CheckIn) {
        const checkIn = prisma.checkIn.update({
            where: {
                id: CheckIn.id
            },
            data: CheckIn
        })

        return checkIn
    }

}