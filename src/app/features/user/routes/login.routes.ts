import { Router } from "express";
import { LoginController } from "../controllers/login.controller";

export const loginRoutes = () => {
  const app = Router();

  app.post("/", new LoginController().login);

  return app;
};
