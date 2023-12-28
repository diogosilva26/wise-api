import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";


//Controllers
import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";

//Middleware
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";

const usersRouter = Router();

const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get("/", isAuthenticated, usersController.index);
usersRouter.post("/", usersController.create);
usersRouter.patch("/avatr", isAuthenticated, upload.single("avatar"), usersAvatarController.update);

export default usersRouter;