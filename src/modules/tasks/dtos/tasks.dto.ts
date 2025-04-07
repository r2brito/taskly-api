import { PriorityEnum } from "../infra/typeorm/entities/enum/priority.enum";

export namespace ITask {
  export namespace DTO {
    export interface ITaskDTO {
      title: string;
      description: string;
      priority: PriorityEnum;
      completed: boolean;
      dueDate: Date;
    }

    export interface List {
      page: number;
      perPage: number;
      search?: string;
    }
  }
}
