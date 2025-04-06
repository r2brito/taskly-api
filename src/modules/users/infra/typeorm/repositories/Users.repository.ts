import { Repository } from 'typeorm';
import { AppDataSource } from '@shared/infra/typeorm/database/data-source';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsers.repository';
import ICreateUserDTO from '@modules/users/dtos/user.dto';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ id });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findAll(): Promise<User[]> {
    let users: User[];

    users = await this.ormRepository.find();

    return users;
  }
}

export default UsersRepository;
