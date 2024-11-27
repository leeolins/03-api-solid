import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repository/in-memory/in-memory-checkIn'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-checkins-history'

let checkInRepository: InMemoryCheckInRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Testing Fetch User Checkins History", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new FetchUserCheckInsHistoryUseCase(
            checkInRepository,
        )
    })



    it("Should check if checkIns was returned succesfully", async () => {

        await checkInRepository.create({ gym_id: 'gym-01', user_id: 'user-01' })

        await checkInRepository.create({ gym_id: 'gym-02', user_id: 'user-01' })

        const { checkIns } = await sut.execute({ userId: 'user-01', page: 1 })


        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ gym_id: 'gym-01' }),
                expect.objectContaining({ gym_id: 'gym-02' })
            ])
        )
    })

    it("Should check if checkIns pagination is working, returning 20 items per page succesfully", async () => {

        for (let index = 1; index < 23; index++) {
            await checkInRepository.create({ gym_id: `gym-${index}`, user_id: 'user-01' })
        }

        const { checkIns } = await sut.execute({ userId: 'user-01', page: 2 })


        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ gym_id: 'gym-21' }),
                expect.objectContaining({ gym_id: 'gym-22' })
            ])
        )
    })




})