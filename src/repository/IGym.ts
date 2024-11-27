import { Gym, Prisma } from "@prisma/client";

export interface UserDistanceParams {
    latitude: number
    longitude: number
}

export interface GymsInterface {
    findById(title: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    searchMany(query: string, page: number): Promise<Gym[]>
    findNear(params: UserDistanceParams): Promise<Gym[]>
}