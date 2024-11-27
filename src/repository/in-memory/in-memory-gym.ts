import { User, Prisma, CheckIn, Gym } from "@prisma/client";
import { UsersInterface } from "../IUser";
import { randomUUID } from "node:crypto";
import { GymsInterface, UserDistanceParams } from "../IGym";
import { ResourceNotFoundError } from "@/useCases/errors/resource-not-found";
import { getDistanceBetweenCoordinates } from "@/useCases/utils/get-distance-beetwen-cordinates";

export class InMemoryGymRepository implements GymsInterface {

    public items: Gym[] = [];

    async findById(gymId: string) {
        const gym = this.items.find((item) => item.id == gymId)

        if (!gym) return null

        return gym
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date(),
        }

        this.items.push(gym)

        return gym;
    }

    async searchMany(query: string, page: number) {
        const gyms = this.items.filter(item => item.title.includes(query)).slice((page - 1) * 20, page * 20)

        return gyms
    }

    async findNear(params: UserDistanceParams) {
        const gyms = this.items.filter(item => {
            const distance = getDistanceBetweenCoordinates({
                latitude: params.latitude,
                longitude: params.longitude
            }, {
                latitude: item.latitude.toNumber(),
                longitude: item.longitude.toNumber()
            }
            )

            return distance <= 10
        }
        )

        return gyms
    }

}