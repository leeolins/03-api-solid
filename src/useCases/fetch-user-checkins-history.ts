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

interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string
    page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
    /**
     *
     */
    constructor(public CheckInRepository: CheckInsInterface) { }

    async execute({ userId, page }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {

        //check if my location is at least 100m nearby gym
        const checkIns = await this.CheckInRepository.fetchUserCheckInsHistoryByUserId(userId, page)

        return {
            checkIns
        }
    }
}
