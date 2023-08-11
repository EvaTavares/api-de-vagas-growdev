import { Recruiter } from "../../../models/recruiter.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Result } from "../../../shared/util/result.contract";
import { Usecase } from "../../../shared/util/usecase.contract";
import { UserRepository } from "../../user/repositories/user.repository";

interface CreateRecruiterParams {
  // id?string;
  name: string;
  email: string;
  password: string;
  enterpriseName: string;
}

export class CreateRecruiterUsecase implements Usecase {
  public async execute(params: CreateRecruiterParams): Promise<Result> {
    // 1- definir os parametro - na interface => id, nome, e-mail(único), senha, nome da empresa.

    // 2- validações
    // verificar se o user ja existe(email) / precisa de um repository
    const repository = new UserRepository();
    const user = await repository.getByEmail(params.email);

    if (user) {
      // ...usuário ja existe com o mesmo email, retirna erro 400
      return {
        ok: false,
        message: "User already exists",
        code: 400,
      };
    }

    const recruiter = new Recruiter(
      params.name,
      params.email,
      params.password,
      params.enterpriseName
    );

    await repository.create(recruiter);

    const cacheRepository = new CacheRepository();
    await cacheRepository.delete("recruites");

    return {
      ok: true,
      message: "Recruiter successfully created",
      code: 201,
    };
  }
}
