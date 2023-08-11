import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../../shared/services/jwt.service";
import { HttpResponse } from "../../../shared/util";

export class CandidateValidator {
  public static checkCandidateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.authorization;

      const jwtService = new JwtService();
      const user = jwtService.decodeToken(token as string);

      if (user.type !== "C") {
        return HttpResponse.forbidden(res);
      }

      req.headers.loggedUserId = user.id;

      next();
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        error: error.toString(),
      });
    }
  }
}
