import { User, Prisma } from "@prisma/client";
import { UsersInterface } from "../IUser";

export class InMemoryUserRepository implements UsersInterface {

    public items: User[] = [];

    async findByEmail(email: string) {
        const result = this.items.find(item => item.email === email)

        if (!result) {
            return null;
        }

        return result;
    }

    async findById(id: string) {
        const result = this.items.find(item => item.id === id)

        if (!result) {
            return null;
        }

        return result;
    }


    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: 'user-01',
            name: data.name,
            email: data.email,
            created_at: new Date(),
            password_hash: data.password_hash!
        }

        this.items.push(user)

        return user;
    }

}