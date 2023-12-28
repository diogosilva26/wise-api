import AppError from "@shared/erros/AppError";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUser } from "../domain/models/IUser";
import { inject, injectable } from "tsyringe";
import { IUpdateUserAvatar } from "../domain/models/IUpdateUserAvatar";
import path from "path";
import fs from "fs";
import uploadConfig from "@config/upload";

@injectable()
class UpdateUserAvatarService
{
    constructor
    (
        @inject("UsersRepository") 
        private userRepository: IUserRepository
    ) {}

    public async execute({ user_id, avatarFilename }: IUpdateUserAvatar): Promise<IUser>
    {
        const user = await this.userRepository.findById(user_id);

        if (!user)
        {
            throw new AppError("User not found.");
        }

        if (user.avatar)
        {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists)
            {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await this.userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;