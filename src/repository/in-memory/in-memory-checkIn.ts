import { User, Prisma, CheckIn } from "@prisma/client";
import { UsersInterface } from "../IUser";
import { CheckInsInterface } from "../ICheckIn";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInRepository implements CheckInsInterface {

    public items: CheckIn[] = [];

    async findCheckInSameDayByUserId(user_id: string, date: Date) {
        const targetYear = date.getFullYear();
        const targetMonth = date.getMonth();
        const targetDate = date.getDate();

        const checkIn = this.items.find((item) =>
            item.user_id === user_id &&
            item.created_at.getFullYear() === targetYear &&
            item.created_at.getMonth() === targetMonth &&
            item.created_at.getDate() === targetDate
        );

        return checkIn || null;
    }


    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),

        }

        this.items.push(checkIn)

        return checkIn;
    }

    async fetchUserCheckInsHistoryByUserId(userId: string, page: number) {
        const checkIns = this.items.filter(item => item.user_id === userId).slice((page - 1) * 20, page * 20)

        return checkIns
    }

    async countUserCheckins(userId: string) {
        const count = this.items.filter(item => item.user_id === userId).length

        return count
    }

    async findById(checkInId: string) {
        const checkIn = this.items.find(item => item.id === checkInId)

        if (!checkIn) return null

        return checkIn
    }

    async save(CheckIn: CheckIn) {
        const checkInIndex = this.items.findIndex(item => item.id === CheckIn.id)

        if (checkInIndex < 0) return null

        this.items[checkInIndex] = CheckIn

        return CheckIn
    }

}