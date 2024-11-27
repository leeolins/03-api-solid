import { it, expect, describe, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repository/in-memory/in-memory-checkIn'
import { ValidateCheckInUseCase } from './validate-checkIn'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { LateCheckInCreationError } from './errors/late-checkin-creation'

let checkInRepository: InMemoryCheckInRepository;

let sut: ValidateCheckInUseCase;

describe("Testing ValidateCheckInUseCase", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new ValidateCheckInUseCase(
            checkInRepository
        )

        // gymRepository.create(
        //     {
        //         id: "gym-01",
        //         title: "JS Gym",
        //         latitude: new Decimal(-23.197019),
        //         longitude: new Decimal(-46.8837252),
        //         description: "Gym",
        //         phone: "11962217228"
        //     }
        // )

        vi.useFakeTimers()
    })

    afterEach(() => {
        // restoring date after each test run
        vi.useRealTimers()
    })

    it("Should validate check-in was checked successfully", async () => {

        const check = await checkInRepository.create({
            gym_id: 'gym-01', user_id: 'user-01'
        })

        const { checkIn } = await sut.execute({ checkInId: check.id })


        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })


    it("Should validate if check-in don't exists ", async () => {

        await expect(sut.execute({ checkInId: 'random-01' }))
            .rejects.toBeInstanceOf(ResourceNotFoundError)
    })


    it("Shouldn't validate check-in after 20 minutes it's creation", async () => {

        vi.setSystemTime(new Date('2024-11-12T13:00:00Z'))

        const check = await checkInRepository.create({
            gym_id: 'gym-01', user_id: 'user-01'
        })


        vi.setSystemTime(new Date('2024-11-12T13:21:00Z'))

        await expect(sut.execute({ checkInId: check.id })).rejects.toBeInstanceOf(LateCheckInCreationError)
    })

})