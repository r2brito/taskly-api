import { inject, injectable } from "tsyringe";
import ITaskDTO from "@modules/tasks/dtos/tasks.dto";
import ITaskRepository from "@modules/tasks/repositories/ITask.repository";
import Tasks from "../../typeorm/entities/Tasks";
import { PriorityEnum } from "../../typeorm/entities/enum/priority.enum";

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
  }: ITaskDTO): Promise<Tasks> {
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

  public async index(): Promise<Tasks[]> {
    const tasks = await this.taskRepository.findAll();

    return tasks;
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
    priority: PriorityEnum,
    completed: boolean,
    dueDate: Date
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
