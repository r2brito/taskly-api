import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Tasks1743649822636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
          },
          {
            name: "title",
            type: "varchar",
            isUnique: true
          },
          {
            name: "description",
            type: "varchar"
          },
          {
            name: "priority",
            type: "varchar"
          },
          {
            name: "completed",
            type: "boolean",
            default: "false",
            isNullable: false
          },
          {
            name: "dueDate",
            type: "date",
            isNullable: true
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tasks");
  }
}
