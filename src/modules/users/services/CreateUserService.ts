import AppError from "@shared/erros/AppError";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUser } from "../domain/models/IUser";
import { inject, injectable } from "tsyringe";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

@injectable()
class CreateUserService
{
    constructor
    (
        @inject("UsersRepository") 
        private userRepository: IUserRepository,
        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {}

    public async execute({ name, email, password, phone}: ICreateUser): Promise<IUser>
    {
        const emailExists = await this.userRepository.findByEmail(email);

        if (emailExists)
        {
            throw new AppError("Email address aleready used.");
        }

        const hasedPassword = await this.hashProvider.generateHash(password);

        const user = await this.userRepository.create(
        {
            name, 
            email,
            password: hasedPassword,
            phone: phone
        });

        return user;
    }
}

export default CreateUserService;