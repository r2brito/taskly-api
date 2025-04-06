import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";

import { IsIn } from "class-validator";

import { PriorityEnum } from "./enum/priority.enum";

@Entity("tasks")
class Tasks {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: PriorityEnum,
    default: PriorityEnum.LOW
  })
  priority: PriorityEnum;

  @Column()
  completed: boolean;

  @Column()
  dueDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tasks;
