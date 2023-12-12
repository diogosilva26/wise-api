import { Router } from "express";
import ResetPasswordController from "../controllers/ResetPasswordController";
import ForgotPasswordController from "../controllers/ForgotPasswordController";

const passwordRouter = Router();

//controllers
const resetPasswordController = new ResetPasswordController();
const forgotPasswordController =  new ForgotPasswordController();

passwordRouter.post("/reset", resetPasswordController.create);
passwordRouter.post("/forgot", forgotPasswordController.create);

export default passwordRouter;