import { Router } from "express";
import { RecruiterController } from "../controllers/recruiter.controller";
import { LoginValidator } from "../../user/validators/login.validator";
import { RecruiterValidator } from "../validators/recruiter.validator";
import { jobApplicationRoutes } from "../../job-application/routes/job-application.routes";

export const recruiterRoutes = () => {
  const app = Router();

  const logged = [
    LoginValidator.checkToken,
    RecruiterValidator.checkRecruiterToken,
  ];

  app.get("/", logged, new RecruiterController().list);
  app.post("/", new RecruiterController().create);

  app.use("/:idJob/application", logged, jobApplicationRoutes());

  return app;
};
