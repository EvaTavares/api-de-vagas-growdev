import { v4 } from "uuid";
import { UserType } from "./user-type.model";
import { UserEntity } from "../shared/database/entities/user.entity";

export class User {
  private _id: string;

  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
    private _type: UserType,
    private _enterpriseName?: string
  ) {
    this._id = v4();
  }

  public get id(): string {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get email(): string {
    return this._email;
  }
  public get password(): string {
    return this._password;
  }
  public get type(): UserType {
    return this._type;
  }
  public get enterpriseName(): string | undefined {
    return this._enterpriseName;
  }

  public toJson() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      type: this._type,
      enterpriseName: this._enterpriseName,
    };
  }

  // pog
  public static create(userEntity: UserEntity) {
    const user = new User(
      userEntity.name,
      userEntity.email,
      userEntity.password,
      userEntity.type,
      userEntity.enterpriseName
    );
    user._id = userEntity.id;

    return user;
  }
}
