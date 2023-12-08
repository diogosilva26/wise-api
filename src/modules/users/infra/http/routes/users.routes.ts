import { Router } from "express";
import UsersController from "../controllers/UsersController";

const usersRouter = Router();

//Controllers
const usersController = new UsersController();

usersRouter.get("/", usersController.index);
usersRouter.post("/", usersController.create);

export default usersRouter;