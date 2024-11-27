import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repository/in-memory/in-memory-checkIn'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-checkins-history'
import { InMemoryGymRepository } from '@/repository/in-memory/in-memory-gym';
import { SearchGymsUseCase } from './search-gyms';

let gymRepository: InMemoryGymRepository;
let sut: SearchGymsUseCase;

describe("Testing Fetch User Checkins History", () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository()
        sut = new SearchGymsUseCase(
            gymRepository,
        )
    })



    it("Should check if the gyms was returned succesfully", async () => {

        await gymRepository.create({
            id: "gym-01",
            title: "Typescript Gym",
            latitude: 23.197019,
            longitude: -46.8837252,
            description: "Gym",
            phone: "11962217228"
        })

        await gymRepository.create({
            id: "gym-01",
            title: "Javascript Gym",
            latitude: 23.197019,
            longitude: -46.8837252,
            description: "Gym",
            phone: "11962217228"
        })

        const { gyms } = await sut.execute({ query: 'Javascript Gym', page: 1 })


        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: 'Javascript Gym' }),
            ])
        )
    })

    it("Should check if search gyms pagination is working, returning 20 items per page succesfully", async () => {

        for (let index = 1; index < 23; index++) {
            await gymRepository.create({
                id: "gym-01",
                title: `Javascript Gym ${index}`,
                latitude: 23.197019,
                longitude: -46.8837252,
                description: "Gym",
                phone: "11962217228"
            })
        }

        const { gyms } = await sut.execute({ query: 'Javascript', page: 2 })


        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: 'Javascript Gym 21' }),
                expect.objectContaining({ title: 'Javascript Gym 22' })
            ])
        )
    })




})