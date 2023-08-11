import { Request, Response } from "express";
import { LoginUsecase } from "../use.cases/login.usecase";

export class LoginController {
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      //fazer os validators

      const result = await new LoginUsecase().execute({
        email,
        password,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "",
      });
    }
  }
}
