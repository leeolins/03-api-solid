import { test, it, expect, describe, beforeEach, afterEach, vi } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-erro'
import { InMemoryCheckInRepository } from '@/repository/in-memory/in-memory-checkIn'
import { InMemoryGymRepository } from '@/repository/in-memory/in-memory-gym'
import { CheckInUseCase } from './check-in'
import { Decimal } from '@prisma/client/runtime/library'
import { CreateGymUseCase } from './create-gym'

let GymRepository: InMemoryGymRepository;
let sut: CreateGymUseCase;

describe("Testing create-GymUseCase", () => {
    beforeEach(() => {
        GymRepository = new InMemoryGymRepository();
        sut = new CreateGymUseCase(GymRepository);
    });

    it("Should check if gym was created successfully", async () => {
        const { gym } = await sut.execute({
            id: "gym-01",
            title: "JS Gym",
            latitude: 23.197019,
            longitude: -46.8837252,
            description: "Gym",
            phone: "11962217228"
        })


        expect(gym.id).toEqual(expect.any(String))
    })

})