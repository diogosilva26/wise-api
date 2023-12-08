import "reflect-metadata";
import { app } from "./app";

const PORT: number = 8080;

const server = app.listen(PORT, () => 
{
    console.log(`Server started on port ${PORT}!`);
});