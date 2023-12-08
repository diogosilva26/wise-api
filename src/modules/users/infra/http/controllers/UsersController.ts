import { Request, Response } from "express";
import { container } from "tsyringe";

//Services
import CreateUserService from "@modules/users/services/CreateUserService";
import ListUsersService from "@modules/users/services/ListUsersService";


class UsersController 
{
    public async index(req: Request, res: Response): Promise<Response>
    {
        const listUsers = container.resolve(ListUsersService)

        const users = await listUsers.execute();

        return res.json(users);
    }

    public async create(req: Request, res: Response): Promise<Response>
    {
        const { name, email, password } = req.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute(
        {
            name,
            email,
            password
        }); 

        return res.json(user);
    }
}

export default UsersController;