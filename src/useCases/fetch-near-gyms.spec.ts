import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repository/in-memory/in-memory-gym';
import { SearchGymsUseCase } from './search-gyms';
import { FetchNearGymsUseCase } from './fetch-near-gyms';

let gymRepository: InMemoryGymRepository;
let sut: FetchNearGymsUseCase;

describe("Testing Fetch User Checkins History", () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository()
        sut = new FetchNearGymsUseCase(
            gymRepository,
        )
    })



    it("Should check if its checking the maximum distance for get a gym (10km)", async () => {

        await gymRepository.create({
            id: "gym-01",
            title: "Near Gym",
            latitude: -23.197019,
            longitude: -46.8837252,
            description: "Gym",
            phone: "11962217228"
        })

        await gymRepository.create({
            id: "gym-01",
            title: "Far Gym",
            latitude: -22.9220711,
            longitude: -47.0547429,
            description: "Gym",
            phone: "11962217228"
        })


        const { gyms } = await sut.execute({
            latitude: -23.197019,
            longitude: -46.8837252
        })


        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: 'Near Gym' }),
            ])
        )
    })
})