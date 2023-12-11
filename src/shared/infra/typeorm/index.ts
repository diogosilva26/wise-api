import { DataSource } from "typeorm";

//Entidades
import User from "@modules/users/infra/typeorm/entities/User";

//Migrações
import { CreateUsers1702013688239 } from "./migrations/1702013688239-CreateUsers";

export const dataSource = new DataSource(
{
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "wiseapi",
    entities: [User],
    migrations: [CreateUsers1702013688239],
});
