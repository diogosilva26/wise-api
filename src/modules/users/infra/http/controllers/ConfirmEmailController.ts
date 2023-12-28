import { Request, Response } from "express";
import { container } from "tsyringe";

// Services
import SendConfirmEmailService from "@modules/users/services/SendConfirmEmailService";
import ConfirmEmailService from "@modules/users/services/ConfirmEmailService";

class ConfirmEmailController
{
  public async create(req: Request, res: Response): Promise<Response>
  {
    const { email } =  req.body;

    const sendConfirmEmail = container.resolve(SendConfirmEmailService)

    await sendConfirmEmail.execute({ email });

    return res.status(204).json();
  }

  public async update(req: Request, res: Response): Promise<Response>
  {
    const { token } = req.body;

    const confirmEmail = container.resolve(ConfirmEmailService);

    await confirmEmail.execute({ token });

    return res.status(204).json();
  }
}

export default ConfirmEmailController;