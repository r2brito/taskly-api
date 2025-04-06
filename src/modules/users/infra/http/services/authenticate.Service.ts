import { Secret, sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";
import authConfig from "@config/auth";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "@modules/users/repositories/IUsers.repository";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthenticateService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject("UsersRepository")
    usersRepository: IUsersRepository,

    @inject("HashProvider")
    hashProvider: IHashProvider
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect Email/Password validation.", 401);
    }

    if (!(await this.hashProvider.compareHash(password, user.password))) {
      throw new AppError("Incorrect Email/Password validation.", 401);
    }

    // @ts-ignore
    const token = sign({ id: user.id }, authConfig.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn
    });

    return {
      user,
      token
    };
  }
}

export default AuthenticateService;
