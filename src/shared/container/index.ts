import { container } from "tsyringe";

import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IUserTokensRepository } from "@modules/users/domain/repositories/IUserTokensRepository";
import UserTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";

//Providers
import "@modules/users/providers";

container.registerSingleton<IUserRepository>("UsersRepository", UsersRepository);
container.registerSingleton<IUserTokensRepository>("UserTokensRepository", UserTokensRepository);