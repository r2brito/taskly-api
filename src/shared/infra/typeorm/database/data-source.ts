import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "postgres",
  synchronize: false,
  logging: true,
  entities: ["src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
  subscribers: []
});
