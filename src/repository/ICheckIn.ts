import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsInterface {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findCheckInSameDayByUserId(user_id: string, date: Date): Promise<CheckIn | null>
    fetchUserCheckInsHistoryByUserId(userId: string, page: number): Promise<CheckIn[]>
    countUserCheckins(userId: string): Promise<number>
    findById(checkInId: string): Promise<CheckIn | null>
    save(CheckIn: CheckIn): Promise<CheckIn | null>
}