import Tasks from "@modules/tasks/infra/typeorm/entities/Tasks";
import { ITask } from "@modules/tasks/dtos/tasks.dto";
import DTOs = ITask.DTO;

export default interface ITaskRepository {
  findById(id: string): Promise<Tasks | null>;
  findByTitle(name: string): Promise<Tasks | null>;
  findAll(
    page: number,
    perPage: number,
    search?: string
  ): Promise<[Tasks[], number]>;
  create(data: DTOs.ITaskDTO): Promise<Tasks>;
  delete(id: string): Promise<void>;
  save(tasks: Tasks): Promise<Tasks>;
}
