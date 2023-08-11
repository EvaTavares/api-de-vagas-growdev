import { UserType } from "../../../models/user-type.model";
import { User } from "../../../models/user.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Result, Usecase } from "../../../shared/util";
import { UserRepository } from "../../user/repositories/user.repository";

interface CreateCandidateParams {
  name: string;
  email: string;
  password: string;
}

export class CreateCandidateUsecase implements Usecase {
  public async execute(params: CreateCandidateParams): Promise<Result> {
    // 1 - definir os parametros OK

    // 2 - verificar se o user ja existe (email) OK
    const repository = new UserRepository();

    const user = await repository.getByEmail(params.email);

    // 3 - Se user existe com o mesmo email, retorna erro 400 OK
    if (user) {
      return {
        ok: false,
        message: "User already exists",
        code: 400,
      };
    }

    // 4 - Criar nosso model tipo recrito new User() - OK
    const candidate = new User(
      params.name,
      params.email,
      params.password,
      UserType.Candidate
    );

    // 5 - Chama o respository para salva o cara no banco OK
    await repository.create(candidate);

    const cacheRepository = new CacheRepository();
    await cacheRepository.delete("candidates");

    // 6 - Retorna o formato da resposta OK
    return {
      ok: true,
      message: "Candidate successfully created",
      code: 201,
    };
  }
}
