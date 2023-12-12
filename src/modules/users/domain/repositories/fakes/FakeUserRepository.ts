import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUser } from "@modules/users/domain/models/IUser";
import { v4 as uuidv4 } from "uuid";
import User from "@modules/users/infra/typeorm/entities/User";

class FakeUsersRepository implements IUserRepository
{
    private users: IUser[] = [];

    public async create({ name, email, password }: ICreateUser): Promise<IUser>
    {
        const user = new User();

        user.id = uuidv4();
        user.name = name;
        user.email = email;
        user.password = password;

        this.users.push(user);

        return user;
    }

    public async find(): Promise<IUser[]>
    {
        return this.users;
    }

    public async save(user: IUser): Promise<IUser>
    {
        const findIndex = this.users.findIndex((findUser) => findUser.id == user.id);

        this.users[findIndex] = user;

        return user;
    }

    public async findById(id: string): Promise<IUser | null> 
    {
        const user = this.users.find((user) => user.id === id);
        return user || null;
    }

    public async findByName(name: string): Promise<IUser | null>
    {
        const user = this.users.find((user) => user.name === name);
        return user || null;
    }

    public async findByEmail(email: string): Promise<IUser | null>
    {
        const user = this.users.find((user) => user.email === email);
        return user || null;
    }
}

export default FakeUsersRepository;