import AppError from "@shared/erros/AppError";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUser } from "../domain/models/IUser";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserService
{
    constructor(@inject("UsersRepository") private userRepository: IUserRepository) {}

    public async execute({ name, email, password}: ICreateUser): Promise<IUser>
    {
        const emailExists = await this.userRepository.findByEmail(email);

        if (emailExists)
        {
            throw new AppError("Email address aleready used.");
        }

        const user = await this.userRepository.create(
        {
            name, 
            email,
            password,
        });

        return user;
    }
}

export default CreateUserService;