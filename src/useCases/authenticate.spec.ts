import { test, it, expect, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare, hash } from 'bcryptjs'
import { InMemoryUserRepository } from '../repository/in-memory/in-memory-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-erro'
import { AuthenticateUseCase } from './authenticate'
import { InvalidAuthenticationError } from './errors/invalid-authentication'

let userRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe("Testing authenticateUseCase", () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new AuthenticateUseCase(
            userRepository
        )
    })

    it("Should check if authentication is working", async () => {
        await userRepository.create({
            name: 'John',
            email: "john@test.com",
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({ email: "john@test.com", password: '123456' })


        expect(user.id).toEqual(expect.any(String))
    })

    it("Should check when password is wrong", async () => {
        const userRepository = new InMemoryUserRepository()
        const sut = new AuthenticateUseCase(
            userRepository
        )

        await userRepository.create({
            name: 'John',
            email: "john@test.com",
            password_hash: await hash('123456', 6)
        })


        expect(
            sut.execute({ email: "john@test.com", password: '1234567' })
        ).rejects.toBeInstanceOf(InvalidAuthenticationError)
    })

    it("Should check when email is wrong", async () => {
        const userRepository = new InMemoryUserRepository()
        const sut = new AuthenticateUseCase(
            userRepository
        )


        expect(
            sut.execute({ email: "john@test.com", password: '1234567' })
        ).rejects.toBeInstanceOf(InvalidAuthenticationError)
    })
})