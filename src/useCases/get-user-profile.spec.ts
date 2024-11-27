import { test, it, expect, describe, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUserRepository } from '../repository/in-memory/in-memory-user'

import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found'

let userRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase;

describe("Testing authenticateUseCase", () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new GetUserProfileUseCase(
            userRepository
        )
    })

    it("Should check if get user profile is working", async () => {
        const createdUser = await userRepository.create({
            name: 'John',
            email: "john@test.com",
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({ userId: createdUser.id })


        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('John')
    })

    it("Should check if get user profile is not working", async () => {

        expect(async () => {
            await sut.execute({ userId: 'non-existing-userId' })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})