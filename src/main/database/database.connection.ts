import { DataSource } from "typeorm";
import databaseConfig from "../config/database.config";

export class Database {
  private static _connection: DataSource;

  public static async connect() {
    this._connection = await databaseConfig.initialize();
  }

  public static get connection() {
    return this._connection;
  }
}
