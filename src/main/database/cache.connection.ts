import Redis from "ioredis";
import config from "../config/redis.config";

export class CacheDatabase {
  private static _connection: Redis;

  // chama no index
  public static async connect() {
    this._connection = new Redis(config);
    console.log("CacheDatabase is connected");
  }

  //chama nos repositorios
  public static get connection() {
    return this._connection;
  }
}
