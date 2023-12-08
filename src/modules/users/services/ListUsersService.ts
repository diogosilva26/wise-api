import AppError from "@shared/erros/AppError";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUser } from "../domain/models/IUser";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUsersService
{
    constructor(@inject("UsersRepository") private userRepository: IUserRepository) {}
    public async execute(): Promise<IUser[]>
    {
        const users = await this.userRepository.find();

        return users;
    }
}

export default ListUsersService;