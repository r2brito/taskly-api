import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUserService from "@modules/users/infra/http/services/authenticate.Service";

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    return response.status(200).json({ user, token });
  }
}

export default SessionsController;
