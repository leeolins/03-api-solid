import { z } from "zod";
import fastify, { FastifyRequest, FastifyReply } from "fastify";
import '@fastify/jwt';
import { AuthenticateUseCase } from "@/useCases/authenticate";
import { PrismaUsersRepository } from "@/repository/prisma/prisma.user.repository";
import { InvalidAuthenticationError } from "../../useCases/errors/invalid-authentication";
import { makeAuthenticateUseCase } from "@/useCases/factories/make-authenticate.useCase";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        email: z.string(),
        password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(request.body);

    const authenticateUseCase = makeAuthenticateUseCase();

    try {
        const { user } = await authenticateUseCase.execute({ email, password });
        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: user.id,
                },
            },
        )
        return reply.status(200).send({ token });
    } catch (error) {
        if (error instanceof InvalidAuthenticationError) {
            return reply.status(400).send({ message: error.message });
        }

        throw error
    }
}
