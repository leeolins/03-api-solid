import { Gym } from "@prisma/client";
import { InMemoryGymRepository } from "@/repository/in-memory/in-memory-gym";
import { GymsInterface } from "@/repository/IGym";

interface SearchGymsUseCaseRequest {
    query: string
    page: number
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymsUseCase {
    /**
     *
     */
    constructor(public GymRepository: GymsInterface) { }

    async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {

        const gyms = await this.GymRepository.searchMany(query, page);

        return {
            gyms
        }
    }
}
