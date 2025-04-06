import * as dotenv from "dotenv";
import path from "path";

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// @ts-ignore
export const AUTH_SECRET: string = process.env.AUTH_SECRET;
// @ts-ignore
export const TOKEN_EXPIRATION_TIME: string = process.env.TOKEN_EXPIRATION_TIME;
