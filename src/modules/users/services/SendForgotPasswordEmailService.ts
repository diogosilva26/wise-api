import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUserTokensRepository } from "../domain/repositories/IUserTokensRepository";
import { ISendForgotPasswordEmail } from "../domain/models/ISendForgotPassordEmail";
import { ISendEmailProvider } from "../providers/SendEmailProvider/models/ISendEmailProvider";
import AppError from "@shared/erros/AppError";
import path from "path";

@injectable()
class SendForgotPasswordEmailService 
{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("SendEmailProvider")
        private sendEmailProvider: ISendEmailProvider,
    ) {}

    public async execute({ email }: ISendForgotPasswordEmail): Promise<void>
    {
        const user = await this.usersRepository.findByEmail(email);

        if (!user)
        {
            throw new AppError("User does not exists.");
        }

        const { token } = await this.userTokensRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(__dirname, "..", "views", "forgot_password.hbs");

        await this.sendEmailProvider.sendMail(
        {
            to:
            {
                name: user.name,
                email: user.email,
            },
            subject: "[API Vendas] Recuperação de senha",
            templateData:
            {
                file: forgotPasswordTemplate,
                variables:
                {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
                }
            }
        });
    }
}

export default SendForgotPasswordEmailService;