import { DataSource } from "typeorm";

//Entidades
import User from "@modules/users/infra/typeorm/entities/User";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";

//Migrações
import { CreateUsers1702013688239 } from "./migrations/1702013688239-CreateUsers";
import { CreateUserTokens1697822854225 } from "./migrations/1702339903467-CreateUserTokens";

export const dataSource = new DataSource(
{
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "wiseapi",
    entities: [User, UserToken],
    migrations: [CreateUsers1702013688239, CreateUserTokens1697822854225],
});
