import AppError from "@shared/erros/AppError";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUser } from "../domain/models/IUser";
import { inject, injectable } from "tsyringe";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import { ICreateSession } from "../domain/models/ICreateSession";
import authConfig from "@config/auth";
import { sign } from "jsonwebtoken";

interface IResponse 
{ 
    user: IUser
    token: string
}

@injectable()
class CreateSessionsService
{
    constructor
    (
        @inject("UsersRepository") 
        private userRepository: IUserRepository,
        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {}

    public async execute({ email, password }: ICreateSession): Promise<IResponse>
    {
        const user = await this.userRepository.findByEmail(email);

        if (!user)
        {
            throw new AppError("Incorrect email/password combinations", 401);
        }

        const passwordConfirmed = await this.hashProvider.compareHash(password, user.password);

        if (!passwordConfirmed)
        {
            throw new AppError("Incorrect email/password combinations", 401);
        }

        const token = sign({}, authConfig.jwt.secret, 
        {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return { user, token };
    }
}

export default CreateSessionsService;