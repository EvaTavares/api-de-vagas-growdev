import { JwtService } from "../../../shared/services/jwt.service";
import { UsecaseResponse } from "../../../shared/util/response.adapter";
import { Result } from "../../../shared/util/result.contract";
import { Usecase } from "../../../shared/util/usecase.contract";
import { UserRepository } from "../repositories/user.repository";

interface LoginParams {
  email: string;
  password: string;
}

export class LoginUsecase implements Usecase {
  public async execute(params: LoginParams): Promise<Result> {
    // buscar o user por email
    const repository = new UserRepository();
    const user = await repository.getByEmail(params.email);

    if (!user) {
      return UsecaseResponse.notFound("User");
    }

    // compara as senhas
    if (user.password !== params.password) {
      return UsecaseResponse.unauthorized();
    }

    // criar um token jwt
    const token = new JwtService().createToken({
      ...user,
      password: null, //tirando a senha par anao ser exposta
    });

    // retorna o user logado
    return UsecaseResponse.success("Login successfully done", {
      ...user.toJson(),
      token,
    });
  }
}
