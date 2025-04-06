import Tasks from "@modules/tasks/infra/typeorm/entities/Tasks";
import ITaskDTO from "@modules/tasks/dtos/tasks.dto";

export default interface ITaskRepository {
  findById(id: string): Promise<Tasks | null>;
  findByTitle(name: string): Promise<Tasks | null>;
  findAll(): Promise<Tasks[]>;
  create(data: ITaskDTO): Promise<Tasks>;
  delete(id: string): Promise<void>;
  save(tasks: Tasks): Promise<Tasks>;
}
