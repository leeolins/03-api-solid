import { test, it, expect, describe, beforeEach, afterEach, vi } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-erro'
import { InMemoryCheckInRepository } from '@/repository/in-memory/in-memory-checkIn'
import { InMemoryGymRepository } from '@/repository/in-memory/in-memory-gym'
import { CheckInUseCase } from './check-in'
import { Decimal } from '@prisma/client/runtime/library'
import { TheSameDayCheckinError } from './errors/checkin-already-exists'
import { MaxDistanceError } from './errors/max-distance'

let checkInRepository: InMemoryCheckInRepository;
let gymRepository: InMemoryGymRepository
let sut: CheckInUseCase;

describe("Testing registerUseCase", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        gymRepository = new InMemoryGymRepository()
        sut = new CheckInUseCase(
            checkInRepository,
            gymRepository
        )

        gymRepository.create(
            {
                id: "gym-01",
                title: "JS Gym",
                latitude: new Decimal(-23.197019),
                longitude: new Decimal(-46.8837252),
                description: "Gym",
                phone: "11962217228"
            }
        )

        vi.useFakeTimers()
    })

    afterEach(() => {
        // restoring date after each test run
        vi.useRealTimers()
    })

    it("Should check if check in was created successfully", async () => {

        const { checkIn } = await sut.execute({ gymId: 'gym-01', userId: 'user-01', userLatitude: -23.197019, userLongitude: -46.8837252 })


        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("User Shouldn't check-in twice on the same day ", async () => {

        const date = new Date(2000, 11, 20, 7, 0, 0)
        vi.setSystemTime(date)

        const { checkIn } = await sut.execute({ gymId: 'gym-01', userId: 'user-01', userLatitude: -23.197019, userLongitude: -46.8837252 })

        console.log(checkIn.created_at)

        expect(sut.execute({ gymId: 'gym-01', userId: 'user-01', userLatitude: -23.197019, userLongitude: -46.8837252 })).rejects.toBeInstanceOf(TheSameDayCheckinError)
    })

    it("User Should check-in in differents day", async () => {
        vi.setSystemTime(new Date(2000, 11, 20, 7, 0, 0))

        const { checkIn } = await sut.execute({ gymId: 'gym-01', userId: 'user-01', userLatitude: -23.197019, userLongitude: -46.8837252 })

        vi.setSystemTime(new Date(2000, 11, 21, 7, 0, 0))

        const checkIn2 = await sut.execute({ gymId: 'gym-01', userId: 'user-01', userLatitude: -23.197019, userLongitude: -46.8837252 })

        expect(checkIn2.checkIn.id).toEqual(expect.any(String));
    })

    it("Should check if there is a check in distance less than 100m", async () => {

        //const { checkIn } = await sut.execute({ gymId: 'gym-01', userId: 'user-01', userLatitude: -23.197019, userLongitude: -46.8837252 })


        await expect(async () => {
            await sut.execute({ gymId: 'gym-01', userId: 'user-01', userLatitude: -23.1920749, userLongitude: -46.8304433 })
        }).rejects.toBeInstanceOf(MaxDistanceError)
    })

})