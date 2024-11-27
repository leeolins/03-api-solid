import { prisma } from "@/lib/prisma";
import { UsersInterface } from "@/repository/IUser";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-erro";
import { CheckIn } from "@prisma/client";
import { CheckInsInterface } from "@/repository/ICheckIn";
import { InMemoryCheckInRepository } from "@/repository/in-memory/in-memory-checkIn";
import { InMemoryGymRepository } from "@/repository/in-memory/in-memory-gym";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { getDistanceBetweenCoordinates } from "./utils/get-distance-beetwen-cordinates";
import { Decimal } from "@prisma/client/runtime/library";
import { TheSameDayCheckinError } from "./errors/checkin-already-exists";
import { MaxDistanceError } from "./errors/max-distance";
import { GymsInterface } from "@/repository/IGym";

interface CheckInUseCaseRequest {
    gymId: string
    userId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    /**
     *
     */
    constructor(public CheckInRepository: CheckInsInterface, public GymRepository: GymsInterface) { }

    async execute({ gymId, userId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        //check if my location is at least 100m nearby gym
        const gym = await this.GymRepository.findById(gymId)

        if (!gym) throw new ResourceNotFoundError()

        const distance = getDistanceBetweenCoordinates({ longitude: Number(gym.longitude), latitude: Number(gym.latitude) }, { longitude: userLongitude, latitude: userLatitude });

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError()
        }

        console.log("Gym Object: ", gym)

        const checkInExists = await this.CheckInRepository.findCheckInSameDayByUserId(
            userId,
            new Date()
        );

        if (checkInExists) {
            throw new TheSameDayCheckinError();
        }

        const checkIn = await this.CheckInRepository.create({
            gym_id: gymId,
            user_id: userId,
        });

        return {
            checkIn
        }
    }
}
