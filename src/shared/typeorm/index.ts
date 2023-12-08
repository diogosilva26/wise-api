import { DataSource } from "typeorm";

const dataSource = new DataSource(
{
    type: "postgres",
    host: "localhost",
    port: 5436,
    username: "postgres",
    password: "123456",
    database: "wiseapi",
    entities: [],
    migrations: []
}); 

export { dataSource };