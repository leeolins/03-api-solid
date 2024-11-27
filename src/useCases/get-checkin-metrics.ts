import { CheckInsInterface } from "@/repository/ICheckIn";

interface GetCheckInMetricsUseCaseRequest {
    userId: string
}

interface GetCheckInMetricsUseCaseResponse {
    count: number
}

export class GetCheckInMetricsUseCase {
    /**
     *
     */
    constructor(public CheckInRepository: CheckInsInterface) { }

    async execute({ userId }: GetCheckInMetricsUseCaseRequest): Promise<GetCheckInMetricsUseCaseResponse> {


        const count = await this.CheckInRepository.countUserCheckins(userId)

        return {
            count
        }
    }
}
