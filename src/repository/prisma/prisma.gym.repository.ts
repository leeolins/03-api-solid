import { Gym, Prisma } from "@prisma/client";
import { GymsInterface, UserDistanceParams } from "../IGym";
import { prisma } from "@/lib/prisma";

export class PrismaGymRepository implements GymsInterface {
    findById(title: string) {
        const gym = prisma.gym.findFirst({
            where: {
                title
            }
        })

        return gym
    }

    create(data: Prisma.GymCreateInput) {
        const gym = prisma.gym.create({
            data
        })

        return gym;
    }

    searchMany(query: string, page: number) {
        const gyms = prisma.gym.findMany({
            where: {
                title: {
                    contains: query
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return gyms
    }

    findNear(params: UserDistanceParams) {
        const { latitude, longitude } = params;

        const gyms = prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return gyms
    }

}