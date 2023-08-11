import { CacheDatabase } from "../../../../main/database/cache.connection";

export class CacheRepository {
  private _repository = CacheDatabase.connection;

  //GET - buscar
  public async get(key: string) {
    const result = await this._repository.get(key);

    if (!result) return null;

    return JSON.parse(result);
  }

  //SET - setar
  public async set(key: string, value: any) {
    await this._repository.set(key, JSON.stringify(value));
  }

  //SETEX - setar com tempo de expiração
  public async setEx(key: string, value: any, seconds: number) {
    await this._repository.setex(key, seconds, JSON.stringify(value));
  }

  public async delete(key: string) {
    await this._repository.del(key);
  }
}
