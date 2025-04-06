import { PriorityEnum } from "../infra/typeorm/entities/enum/priority.enum";

export default interface ITaskDTO {
  title: string;
  description: string;
  priority: PriorityEnum;
  completed: boolean;
  dueDate: Date;
}
