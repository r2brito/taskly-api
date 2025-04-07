import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/database/data-source";

import Tasks from "@modules/tasks/infra/typeorm/entities/Tasks";

import ITasksRepository from "@modules/tasks/repositories/ITask.repository";
import { ITask } from "@modules/tasks/dtos/tasks.dto";

import DTOs = ITask.DTO;

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
  }: DTOs.ITaskDTO): Promise<Tasks> {
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

  public async findAll(
    page: number,
    perPage: number,
    search?: string
  ): Promise<[Tasks[], number]> {
    const queryBuilder = this.ormRepository.createQueryBuilder("task");

    if (search) {
      queryBuilder.where("task.title ILIKE :search", { search: `%${search}%` });
    }

    const [tasks, total] = await queryBuilder
      .skip((page - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    return [tasks, total];
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TasksRepository;
