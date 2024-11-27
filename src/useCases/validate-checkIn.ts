import { CheckIn } from "@prisma/client";
import { CheckInsInterface } from "@/repository/ICheckIn";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import dayjs from 'dayjs';
import { LateCheckInCreationError } from "./errors/late-checkin-creation";

interface ValidateCheckInUseCaseRequest {
    checkInId: string
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckInUseCase {
    /**
     *
     */
    constructor(public CheckInRepository: CheckInsInterface) { }

    async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {

        const checkIn = await this.CheckInRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        const differenceBetweenValidateAndCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'milliseconds')

        console.log("differenceBetweenValidateAndCheckInCreation: ", differenceBetweenValidateAndCheckInCreation)

        const twentyOneMinutesInMs = (1000 * 60 * 21)

        if (differenceBetweenValidateAndCheckInCreation >= twentyOneMinutesInMs) {
            throw new LateCheckInCreationError();
        }

        checkIn.validated_at = new Date()

        await this.CheckInRepository.save(checkIn)

        return {
            checkIn
        }
    }
}
