import { inject, injectable } from "tsyringe";
import Tasks from "../../typeorm/entities/Tasks";
import ITaskRepository from "@modules/tasks/repositories/ITask.repository";
import { PriorityEnum } from "../../typeorm/entities/enum/priority.enum";

import { ITask } from "@modules/tasks/dtos/tasks.dto";
import DTOs = ITask.DTO;

@injectable()
class TasksService {
  private taskRepository: ITaskRepository;

  constructor(
    @inject("TaskRepository")
    taskRepository: ITaskRepository
  ) {
    this.taskRepository = taskRepository;
  }
  public async execute({
    title,
    description,
    priority,
    completed,
    dueDate
  }: DTOs.ITaskDTO): Promise<Tasks> {
    const taskExists = await this.taskRepository.findByTitle(title);

    if (taskExists) {
      throw new Error("Task already in use");
    }

    const task = await this.taskRepository.create({
      title,
      description,
      priority,
      completed,
      dueDate
    });

    return task;
  }

  public async list({ page = 1, perPage = 10, search }: DTOs.List): Promise<{
    data: Tasks[];
    meta: {
      currentPage: number;
      perPage: number;
      totalItems: number;
      totalPages: number;
      hasNextPage: boolean;
    };
  }> {
    const [tasks, total] = await this.taskRepository.findAll(
      page,
      perPage,
      search
    );

    const totalPages = Math.ceil(total / perPage);

    return {
      data: tasks,
      meta: {
        currentPage: page,
        perPage,
        totalItems: total,
        totalPages,
        hasNextPage: page < totalPages
      }
    };
  }

  public async show(id: string): Promise<Tasks | undefined> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  public async update(
    id: string,
    title: string,
    description: string,
    dueDate: Date,
    priority: PriorityEnum,
    completed: boolean
  ): Promise<Tasks> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    task.title = title;
    task.description = description;
    task.priority = priority;
    task.completed = completed;
    task.dueDate = dueDate;

    await this.taskRepository.save(task);

    return task;
  }

  public async delete(id: string): Promise<Tasks | undefined> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    await this.taskRepository.delete(id);

    return task;
  }
}

export default TasksService;
