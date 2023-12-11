import { Repository } from "typeorm";
import User from "../entities/User";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUser } from "@modules/users/domain/models/IUser";
import { dataSource } from "@shared/infra/typeorm";


class UsersRepository implements IUserRepository
{
    private ormRepository: Repository<User>;

    constructor()
    {
        this.ormRepository = dataSource.getRepository(User);
    }

    public async create({ name, email, password }: ICreateUser): Promise<User>
    {
        const user = this.ormRepository.create({ name, email, password });

        await this.ormRepository.save(user);

        return user;
    }

    public async find(): Promise<User[]>
    {
        const users = await this.ormRepository.find();

        return users;
    }

    public async save(user: IUser): Promise<User>
    {
        await this.ormRepository.save(user);

        return user;
    }

    public async findByName(name: string): Promise<User | null>
    {
        const user = await this.ormRepository.findOneBy(
        {
            name,
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | null>
    {
        const user = await this.ormRepository.findOneBy(
        {
            email,
        });

        return user;
    }
}

export default UsersRepository;