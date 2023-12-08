import User from "@modules/users/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUser } from "@modules/users/domain/models/IUser";
import { v4 as uuidv4 } from "uuid";

class FakeUsersRepository implements IUserRepository
{
    private users: User[] = [];

    public async create({ name, email, password }: ICreateUser): Promise<User>
    {
        const user = new User();

        user.id = uuidv4();
        user.name = name;
        user.email = email;

        this.users.push(user);

        return user;
    }

    public async find(): Promise<User[]>
    {
        return this.users;
    }

    public async save(user: IUser): Promise<User>
    {
        Object.assign(this.users, user);

        return user;
    }

    public async findByName(name: string): Promise<User | undefined>
    {
        const user = this.users.find((user) => user.name == name);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined>
    {
        const user = this.users.find((user) => user.email == email);
        return user;
    }
}

export default FakeUsersRepository;