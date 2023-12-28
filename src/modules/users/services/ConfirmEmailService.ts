import AppError from "@shared/erros/AppError";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { IUserTokensRepository } from "../domain/repositories/IUserTokensRepository";
import { IDateProvider } from "../providers/DateProvider/models/IDateProvider";
import { IConfirmEmail } from "../domain/models/IConfirmEmail";

@injectable()
class ConfirmEmailService
{
    constructor
    (
        @inject("UsersRepository") 
        private userRepository: IUserRepository,
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
    ) {}

    public async execute({ token }: IConfirmEmail): Promise<void>
    {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken)
        {
            throw new AppError("User Token does not exists.");
        }

        const user = await this.userRepository.findById(userToken.user_id);

        if (!user)
        {
            throw new AppError("User does not exists.");
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = this.dateProvider.addHours(tokenCreatedAt, 2);

        if (this.dateProvider.isAfter(new Date(Date.now()), compareDate))
        {
            throw new AppError("Token expired.");
        }

        user.is_verify = true;
        await this.userRepository.save(user);
    }
}

export default ConfirmEmailService;