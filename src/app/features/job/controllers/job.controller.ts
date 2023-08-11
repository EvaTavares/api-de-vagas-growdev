import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/util";
import { CreateJobUsecase } from "../usecases/create-job.usecase";

export class JobController {
  public async create(req: Request, res: Response) {
    try {
      const { description, enterprise, limitDate, isActive, maxCandidates } =
        req.body;
      const idRecruiter = 123;

      if (!description) {
        return HttpResponse.fieldNotProvided(res, "Description");
      }

      if (!enterprise) {
        return HttpResponse.fieldNotProvided(res, "enterprise");
      }

      if (!limitDate) {
        return HttpResponse.fieldNotProvided(res, "limitDate");
      }

      if (!isActive) {
        return HttpResponse.fieldNotProvided(res, "isActive");
      }

      if (!maxCandidates) {
        return HttpResponse.fieldNotProvided(res, "maxCandidates");
      }

      const result = await new CreateJobUsecase().execute({
        ...req.body,
        idRecruiter,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
