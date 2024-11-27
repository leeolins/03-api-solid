import { Gym } from "@prisma/client";
import { InMemoryGymRepository } from "@/repository/in-memory/in-memory-gym";
import { GymsInterface } from "@/repository/IGym";

interface FetchNearGymsUseCaseRequest {
    latitude: number,
    longitude: number
}

interface FetchNearGymsUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearGymsUseCase {
    /**
     *
     */
    constructor(public GymRepository: GymsInterface) { }

    async execute({ latitude, longitude }: FetchNearGymsUseCaseRequest): Promise<FetchNearGymsUseCaseResponse> {

        const gyms = await this.GymRepository.findNear({ latitude, longitude });

        return {
            gyms
        }
    }
}
