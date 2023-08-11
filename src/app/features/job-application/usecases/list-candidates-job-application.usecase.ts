import { Result, Usecase, UsecaseResponse } from "../../../shared/util";
import { JobApplicationRepository } from "../repositories/job-application.repository";

interface ListCandidatesJob {
  idRecruiter: string;
  idJob: string;
}

export class ListCandidatesJobApplication implements Usecase {
  public async execute(params: ListCandidatesJob): Promise<Result> {
    // buscar a vaga pelo id => repository
    const repository = new JobApplicationRepository();
    const result = await repository.listByJobId(params.idJob);

    // 2- verificar se essa vaga pertnce a recrutador logado
    const recruiterLogged = result.some(
      (job) => job.job.recreiter.id === params.idRecruiter
    );

    // 3 - caso não pertença retornar erro
    if (!recruiterLogged) {
      return UsecaseResponse.unauthorized();
    }

    //  4- retornar vaga com os candidatos
    return {
      ok: true,
      code: 200,
      message: "Candidates from the Job application successfully listed",
      data: result,
    };
  }
}
