import { Job } from "./job.model";
import { User } from "./user.model";

export class JobApplication {
  private _success: boolean;

  constructor(
    private _candidate: User,
    private _job: Job,
    private _date: Date
  ) {
    this._success = false;
  }
}
