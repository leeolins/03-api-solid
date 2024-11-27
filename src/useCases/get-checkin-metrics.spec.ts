import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repository/in-memory/in-memory-checkIn'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-checkins-history'
import { GetCheckInMetricsUseCase } from './get-checkin-metrics';

let checkInRepository: InMemoryCheckInRepository;
let sut: GetCheckInMetricsUseCase;

describe("Testing count number of checkins", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new GetCheckInMetricsUseCase(
            checkInRepository,
        )
    })


    it("Should check if checkIns was returned succesfully", async () => {

        await checkInRepository.create({ gym_id: 'gym-01', user_id: 'user-01' })

        await checkInRepository.create({ gym_id: 'gym-02', user_id: 'user-01' })

        const { count } = await sut.execute({ userId: 'user-01' })

        expect(count).toEqual(2);
    })

})