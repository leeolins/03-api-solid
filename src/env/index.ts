import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
    JWT_SECRET: z.string()
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error("Invalid env configured");

    throw new Error("Invalid environment variables");
}

export const env = _env.data;