import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import { IUserToken } from "../../models/IUserToken";
import { IUserTokensRepository } from "../IUserTokensRepository";
import { v4 as uuidv4 } from "uuid"

class FakeUserTokenRepository implements IUserTokensRepository
{
    private userTokens: IUserToken[] = [];

    async create(user_id: string): Promise<IUserToken>
    {
        const userToken = new UserToken();

        userToken.id = uuidv4();
        userToken.token = uuidv4();
        userToken.user_id = user_id;
        userToken.created_at = new Date(Date.now());
        userToken.updated_at = new Date(Date.now());

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<IUserToken | null> 
    {
        const userToken = this.userTokens.find((userToken) => userToken.token === token);
        return userToken || null;
    }

    public async generate(user_id: string): Promise<IUserToken> 
    {
        return await this.create(user_id);
    }

    public async decreaseHours(id: string, amount: number): Promise<void>
    {
        const findIndex = this.userTokens.findIndex((findUserToken) => findUserToken.id === id);

        this.userTokens[findIndex].created_at = new Date(this.userTokens[findIndex].created_at.setHours(this.userTokens[findIndex].created_at.getHours() - amount));
    }
}

export default FakeUserTokenRepository;