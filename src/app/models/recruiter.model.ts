import { UserType } from "./user-type.model";
import { User } from "./user.model";

export class Recruiter extends User {
  constructor(
    _name: string,
    _email: string,
    _password: string,
    _enterpriseName: string
  ) {
    super(_name, _email, _password, UserType.Recruiter, _enterpriseName);
  }
}
