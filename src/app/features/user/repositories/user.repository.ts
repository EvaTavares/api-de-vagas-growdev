import { UserEntity } from "../../../shared/database/entities/user.entity";
import { Database } from "../../../../main/database/database.connection";
import { User } from "../../../models/user.model";
import { UserType } from "../../../models/user-type.model";

export class UserRepository {
  private repository = Database.connection.getRepository(UserEntity);

  public async getByEmail(email: string): Promise<User | undefined> {
    const result = await this.repository.findOneBy({
      email,
    });

    return UserRepository.mapRowToModel(result);
  }

  public async getById(id: string): Promise<User | undefined> {
    const result = await this.repository.findOneBy({
      id,
    });

    return UserRepository.mapRowToModel(result);
  }

  public async create(user: User) {
    const entity = this.repository.create({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      type: user.type,
      enterpriseName: user.enterpriseName,
    });
    await this.repository.save(entity);
  }

  public async list(type: UserType) {
    const result = await this.repository.find({
      where: {
        type,
      },
      select: ["id", "email", "name", "type"],
    });

    return result.map((row) => UserRepository.mapRowToModel(row)!);
  }

  public static mapRowToModel(user?: UserEntity | null) {
    if (!user) {
      return undefined;
    }

    return User.create(user);
  }
}
