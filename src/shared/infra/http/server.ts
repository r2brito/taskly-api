import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import cors from "cors";

import express, { Request, Response, NextFunction } from "express";

import routes from "./routes";

import "@shared/container";
import { AppDataSource } from "../typeorm/database/data-source";
import AppError from "@shared/errors/AppError";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }

  console.log(err);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 3001;

(async () => {
  console.log("Initializing database connection...");
  await AppDataSource.initialize().catch((err) => {
    console.error("Error connecting to the database: ", err);
    process.exit(1);
  });

  console.log("Database connected successfully!");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
