import { IUserToken } from "@modules/users/domain/models/IUserToken";
import { IUserTokensRepository } from "@modules/users/domain/repositories/IUserTokensRepository";
import { Repository } from "typeorm";
import UserToken from "../entities/UserToken";
import { dataSource } from "@shared/infra/typeorm";

class UserTokensRepository implements IUserTokensRepository
{
    private ormRepository: Repository<UserToken>;

    constructor()
    {
        this.ormRepository = dataSource.getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<IUserToken | null> 
    {
        const userToken = await this.ormRepository.findOne(
        {
            where: { token },
        });

        return userToken;
    }

    public async generate(user_id: string): Promise<IUserToken> 
    {
        const userToken = this.ormRepository.create({ user_id })

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;