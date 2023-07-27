import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export default new DataSource({
  type: "postgres",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: ["src/app/shared/database/migrations/**/*.ts"],
  entities: ["src/app/shared/database/entities/**/*.ts"],
  schema: "vagas",
});
