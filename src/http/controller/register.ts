import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterUseCase } from "@/useCases/register";
import { PrismaUsersRepository } from "@/repository/prisma/prisma.user.repository";
import { UserAlreadyExistsError } from "@/useCases/errors/user-already-exists-erro";
import { makeRegisterUseCase } from "@/useCases/factories/make-register-useCase";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const registerUseCase = makeRegisterUseCase();

    try {
        await registerUseCase.execute({ name, email, password });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message });
        }

        throw error
    }

    return reply.status(201).send("");
}
