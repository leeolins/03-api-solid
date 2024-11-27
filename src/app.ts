import fastify from "fastify";
import { routeApp } from "./http/controller/routes";
import { ZodError } from "zod";
import { env } from './env'

export const app = fastify();


app.register(require('@fastify/jwt'), {
    secret: env.JWT_SECRET
})

app.register(routeApp);

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        reply.status(400).send({ issues: error.format() })
    }

    if (env.NODE_ENV !== "production") {
        console.log(error)
    } else {
        // I could implement datadog, new relic, sentry here.
    }

    reply.status(500).send({ message: "Internal Server Error" })
})