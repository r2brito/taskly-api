import { Request, Response } from "express";
import { container } from "tsyringe";

import UsersService from "../services/users.service";

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(UsersService);

    const user = await createUser.execute({ name, email, password });

    return res.status(200).json(user);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listAllUsers = container.resolve(UsersService);

    const users = await listAllUsers.index();

    return res.status(200).json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showUser = container.resolve(UsersService);

    const user = await showUser.show(id);

    return res.status(200).json(user);
  }
}

export default UsersController;
