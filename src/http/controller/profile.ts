import { makeGetUserProfileUseCase } from "@/useCases/factories/make-get-user-profile";
import { FastifyRequest, FastifyReply } from "fastify";
import { stringify } from "querystring";


export async function profile(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
        console.log(request.user.sub)
        console.log('user.sub: ', request.user.sub)
    } catch (err) {
        reply.send(err);
    }

    const getUserProfileUseCase = makeGetUserProfileUseCase()

    const { user } = await getUserProfileUseCase.execute({
        userId: request.user.sub
    })

    const { password_hash, ...userWithOutPassword } = user;

    // user.password_hash = null,

    return reply.status(200).send({
        userWithOutPassword
    });
}
