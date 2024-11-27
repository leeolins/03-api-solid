import { prisma } from "@/lib/prisma";
import { UsersInterface } from "@/repository/IUser";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-erro";
import { Gym } from "@prisma/client";
import { CheckInsInterface } from "@/repository/ICheckIn";
import { InMemoryCheckInRepository } from "@/repository/in-memory/in-memory-checkIn";
import { InMemoryGymRepository } from "@/repository/in-memory/in-memory-gym";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { getDistanceBetweenCoordinates } from "./utils/get-distance-beetwen-cordinates";
import { Decimal } from "@prisma/client/runtime/library";
import { GymsInterface } from "@/repository/IGym";

interface GymUseCaseRequest {
    id: string
    title: string
    description?: string
    phone?: string
    latitude: number
    longitude: number
}

interface GymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {
    /**
     *
     */
    constructor(public GymRepository: GymsInterface) { }

    async execute({ id, title, description, phone, latitude, longitude }: GymUseCaseRequest): Promise<GymUseCaseResponse> {

        console.log("working?")
        const gym = await this.GymRepository.create({
            id,
            title,
            latitude,
            longitude,
            description,
            phone
        });

        return {
            gym
        }
    }
}
