import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/database/data-source";

import Tasks from "@modules/tasks/infra/typeorm/entities/Tasks";

import ITasksRepository from "@modules/tasks/repositories/ITask.repository";
import ITaskDTO from "@modules/tasks/dtos/tasks.dto";

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Tasks>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Tasks);
  }

  public async create({
    title,
    description,
    priority,
    completed,
    dueDate
  }: ITaskDTO): Promise<Tasks> {
    const user = this.ormRepository.create({
      title,
      description,
      priority,
      completed,
      dueDate
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: Tasks): Promise<Tasks> {
    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<Tasks | null> {
    const user = await this.ormRepository.findOneBy({ id });

    return user;
  }

  public async findByTitle(title: string): Promise<Tasks | null> {
    const task = await this.ormRepository.findOne({ where: { title } });

    return task;
  }

  public async findAll(): Promise<Tasks[]> {
    let tasks: Tasks[];

    tasks = await this.ormRepository.find();

    return tasks;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TasksRepository;
