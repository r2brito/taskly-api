import { inject, injectable } from "tsyringe";
import path from "path";
import IUserDTO from "@modules/users/dtos/user.dto";
import IUsersRepository from "@modules/users/repositories/IUsers.repository";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import User from "../../typeorm/entities/User";

@injectable()
class UsersService {
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
  public async execute({ name, email, password }: IUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error("Email already in use");
    }

    const hash_password = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hash_password
    });

    return user;
  }

  public async index(): Promise<User[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }

  public async show(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export default UsersService;
