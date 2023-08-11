import cors from "cors";

import express, { Request, Response } from "express";
import { recruiterRoutes } from "../../app/features/recruiter/routes/recruiter.routes";
import { loginRoutes } from "../../app/features/user/routes/login.routes";
import { candidateRoutes } from "../../app/features/candidate/routes/candidate.routes";
import { jobApplicationRoutes } from "../../app/features/job-application/routes/job-application.routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get("/", (req: Request, res: Response) =>
    res.status(200).json({ ok: true, message: "API JOBS" })
  );

  // ROUTES
  app.use("/recruiter", recruiterRoutes());
  app.use("/auth", loginRoutes());
  app.use("/candidate", candidateRoutes());
  // app.use("/job", jobRoute());
  app.use("/application", jobApplicationRoutes());

  return app;
};
