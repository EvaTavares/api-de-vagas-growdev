import { JobApplicationEntity } from "../shared/database/entities/job-application.entity";
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

  public get candidate(): User {
    return this._candidate;
  }

  public get job(): Job {
    return this._job;
  }

  public get date(): Date {
    return this._date;
  }

  public get success(): boolean {
    return this._success;
  }

  public static create(
    application: JobApplicationEntity,
    candidate: User,
    job: Job
  ) {
    const app = new JobApplication(candidate, job, application.date);
    app._success = application.success;

    return app;
  }
}
