import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import AppError from "@shared/erros/AppError";

const app = express();

const PORT: number = 8080;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) =>
{
    console.log(error.stack);
    if (error instanceof AppError)
    {
        return res.status(error.statusCode).json(
        {
            status: "error",
            message: error.message,
        });
    }

    return res.status(500).json(
    {
        status: "error",
        message: "Internal server error."
    });
});

app.listen(PORT, () => 
{
    console.log(`Server started on port ${PORT}!`);
});
