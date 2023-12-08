import "reflect-metadata";
import { app } from "./app";
import { dataSource } from "../typeorm";

const PORT: number = 8080;

dataSource.initialize().then(() => 
{
    const server = app.listen(PORT, () => 
    {
        console.log(`Server started on port ${PORT}!`);
    });
});