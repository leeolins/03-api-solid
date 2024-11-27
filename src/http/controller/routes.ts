import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";

export async function routeApp(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/session", authenticate);

    // Authenticated Routes
    app.get("/me", profile)
}
