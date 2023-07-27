import { v4 } from "uuid";
import { UserType } from "./user-type.model";

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
}
