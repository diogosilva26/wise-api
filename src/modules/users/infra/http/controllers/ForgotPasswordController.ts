import SendForgotPasswordEmailService from "@modules/users/services/SendForgotPasswordEmailService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ForgotPasswordController
{
  public async create(req: Request, res: Response): Promise<Response>
  {
    const { email } =  req.body;

    const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService)

    await sendForgotPasswordEmail.execute({ email });

    return res.status(204).json();
  }
}

export default ForgotPasswordController;
