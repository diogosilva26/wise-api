import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUserTokensRepository } from "../domain/repositories/IUserTokensRepository";
import { ISendEmailProvider } from "../providers/SendEmailProvider/models/ISendEmailProvider";
import AppError from "@shared/erros/AppError";
import path from "path";
import { ISendConfirmEmail } from "../domain/models/ISendConfirmEmail";

@injectable()
class SendConfirmEmailService 
{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("SendEmailProvider")
        private sendEmailProvider: ISendEmailProvider,
    ) {}

    public async execute({ email }: ISendConfirmEmail): Promise<void>
    {
        const user = await this.usersRepository.findByEmail(email);

        if (!user)
        {
            throw new AppError("User does not exists.");
        }

        const { token } = await this.userTokensRepository.generate(user.id);

        const confirmEmailTemplate = path.resolve(__dirname, "..", "views", "confirm_email.hbs");

        await this.sendEmailProvider.sendMail(
        {
            to:
            {
                name: user.name,
                email: user.email,
            },
            subject: "[Wise] Confirmação de email",
            templateData:
            {
                file: confirmEmailTemplate,
                variables:
                {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/confirm_email?token=${token}`
                }
            }
        });
    }
}

export default SendConfirmEmailService;