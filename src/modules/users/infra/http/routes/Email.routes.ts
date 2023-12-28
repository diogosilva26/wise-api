import { Router } from "express";
import ConfirmEmailController from "../controllers/ConfirmEmailController";

const emailRouter = Router();

//controllers
const confirmEmailController = new ConfirmEmailController();

emailRouter.post("/", confirmEmailController.create);
emailRouter.patch("/", confirmEmailController.update);

export default emailRouter;