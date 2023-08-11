import { Job } from "../../../models/job.model";
import { Recruiter } from "../../../models/recruiter.model";
import { Result, Usecase, UsecaseResponse } from "../../../shared/util";
import { UserRepository } from "../../user/repositories/user.repository";
import { JobRepository } from "../repositories/job.repository";

// private _description: string,
// private _enterprise: string,
// private _limitDate: Date,
// private _isActive: boolean,
// private _recruiter: Recruiter,
// private _maxCandidates?: number

interface CreateJobParams {
  description: string;
  enterprise: string;
  limitDate: Date;
  isActive: boolean;
  recruiterId: string;
  maxCandidates?: number;
}

export class CreateJobUsecase implements Usecase {
  public async execute(params: CreateJobParams): Promise<Result> {
    // 1 - definir os parametros

    // 2 - pegar o id recruiter e buscar ele
    const repository = new UserRepository();
    const recruiter = await repository.getById(params.recruiterId);

    if (!recruiter) {
      return UsecaseResponse.notFound("Recruiter");
    }

    // 3 - modelar/criar - new Job()
    const job = new Job(
      params.description,
      params.enterprise,
      params.limitDate,
      params.isActive,
      recruiter,
      params.maxCandidates
    );

    // 4 - chamar repository JOB
    const jobRepository = new JobRepository();
    await jobRepository.create(job);

    // 5 - retorna
    return {
      ok: true,
      message: "Job successfully created",
      code: 201,
    };
  }
}
