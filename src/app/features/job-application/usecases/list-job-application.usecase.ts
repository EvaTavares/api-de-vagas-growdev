import { Result } from "../../../shared/util";
import { Usecase } from "../../../shared/util/usecase.contract";
import { JobApplicationRepository } from "../repositories/job-application.repository";

export class ListJobsApplication implements Usecase {
  public async execute(idCandidate: string): Promise<Result> {
    const repository = new JobApplicationRepository();
    const result = await repository.listByCandidateId(idCandidate);

    return {
      ok: true,
      code: 200,
      message: "Jobs application successfully listed",
      data: result?.map((job) => job?.job.toJson()),
    };
  }
}
