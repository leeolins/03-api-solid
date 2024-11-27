import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersInterface } from "@/repository/IUser"

export class PrismaUsersRepository implements UsersInterface {
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user
    }
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        });

        return user;
    }
}
