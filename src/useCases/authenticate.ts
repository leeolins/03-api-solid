import { User } from '@prisma/client'
import { PrismaUsersRepository } from '../repository/prisma/prisma.user.repository'
import { InvalidAuthenticationError } from './errors/invalid-authentication';
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User;
}

export class AuthenticateUseCase {

    constructor(private userRepository: PrismaUsersRepository) {

    }

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidAuthenticationError;
        }

        const doesPasswordMatches = await compare(password, user.password_hash!)

        if (!doesPasswordMatches) {
            throw new InvalidAuthenticationError;
        }

        return {
            user,
        }
    }
}