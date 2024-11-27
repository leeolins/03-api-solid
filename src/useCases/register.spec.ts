import { test, it, expect, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-erro'

let userRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe("Testing registerUseCase", () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new RegisterUseCase(
            userRepository
        )
    })

    it("Should check if user was created successfully", async () => {

        const { user } = await sut.execute({ name: "John Doe", email: "john@test.com", password: '123456' })

        expect(user.id).toBeDefined();
        expect(user.id).not.toBeNull();
        expect(user.id).toEqual(expect.any(String))
    })

    it("Should check if password was hashed", async () => {

        const { user } = await sut.execute({ name: "John Doe", email: "john@test.com", password: '123456' })
        const passwordIsHashed = await compare('123456', user.password_hash!)

        expect(passwordIsHashed).toBe(true)
    })

    it("Should check if the app is checking duplicate email", async () => {


        const email = "john@test.com";

        await sut.execute({ name: "John Doe1", email, password: '123456' })

        await expect(
            sut.execute({ name: "John Doe2", email, password: '123456' })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})