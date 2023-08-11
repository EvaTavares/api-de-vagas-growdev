import { v4 } from "uuid";
import { Recruiter } from "./recruiter.model";
import { JobEntity } from "../shared/database/entities/job.entity";

export class Job {
  private _id: string;

  constructor(
    private _description: string,
    private _enterprise: string,
    private _limitDate: Date,
    private _isActive: boolean,
    private _recruiter: Recruiter,
    private _maxCandidates?: number
  ) {
    this._id = v4();
  }
  public get id(): string {
    return this._id;
  }
  public get description(): string {
    return this._description;
  }
  public get enterprise(): string {
    return this._enterprise;
  }
  public get limitDate(): Date {
    return this._limitDate;
  }
  public get isActive(): boolean {
    return this._isActive;
  }
  public get recruiter(): Recruiter {
    return this._recruiter;
  }
  public get maxCandidates(): number | undefined {
    return this._maxCandidates;
  }

  public toJson() {
    return {
      id: this._id,
      description: this._description,
      enterprise: this._enterprise,
      limitDate: this._limitDate,
      isActive: this._isActive,
      recruiter: this._recruiter?.name,
      maxCandidate: this._maxCandidates,
    };
  }

  public static create(jobEntity: JobEntity, recruiter: Recruiter) {
    const job = new Job(
      jobEntity.description,
      jobEntity.enterprise,
      jobEntity.limitDate,
      jobEntity.isActive,
      recruiter,
      jobEntity.maxCandidates
    );

    job._id = jobEntity.id;

    return job;
  }
}
