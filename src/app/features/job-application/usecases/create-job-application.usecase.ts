import { JobApplication } from "../../../models/job-application.model";
// private _candidate: User,
// private _job: Job,
// private _date: Date

import { User } from "../../../models/user.model";
import { Result, UsecaseResponse } from "../../../shared/util";
import { Usecase } from "../../../shared/util/usecase.contract";
import { JobRepository } from "../../job/repositories/job.repository";
import { UserRepository } from "../../user/repositories/user.repository";
import { JobApplicationRepository } from "../repositories/job-application.repository";

interface CreateJobApplicationParams {
  idCandidate: string;
  idJob: string;
}

export class CreateJobApplicationUsecase implements Usecase {
  public async execute(params: CreateJobApplicationParams): Promise<Result> {
    // 1- Verifica se o user existe
    const repository = new UserRepository();
    const user = await repository.getById(params.idCandidate);
    if (!user) {
      return UsecaseResponse.notFound("User");
    }

    // 2- Verifica se a vaga existe
    const jobRepository = new JobRepository();
    const job = await jobRepository.getById(params.idJob);
    if (!job) {
      return UsecaseResponse.notFound("Job");
    }

    // 3- A data limite da vaga já foi alcançada
    if (job.limitDate < new Date()) {
      return UsecaseResponse.invalidField(
        "Deadline",
        "Job is not accepting applications anymore"
      );
    }

    // 4- A vaga não está ativa
    if (!job.isActive) {
      return UsecaseResponse.invalidField("Job", "Job is inactive");
    }

    // 5- A vaga já está lotada de candidatos, quando tiver número máximo definido
    const jobApplicationRepository = new JobApplicationRepository();
    const applications = await jobApplicationRepository.listByJobId(job.id);

    if (job.maxCandidates && job.maxCandidates <= applications.length) {
      return UsecaseResponse.invalidField(
        "Job",
        "Job applications already fullfiled"
      );
    }

    // 6- O candidato já se aplicou a mesma vaga
    if (
      applications.some((application) => application.candidate.id === user.id)
    ) {
      return UsecaseResponse.invalidField(
        "Candidate",
        "Candidate already subscribed"
      );
    }

    // - Cria a candidatura e salva no BD
    const jobApplication = new JobApplication(user, job, new Date());
    await jobApplicationRepository.create(jobApplication);

    return UsecaseResponse.success(
      "Job Application successfully created",
      jobApplication
    );
  }
}
