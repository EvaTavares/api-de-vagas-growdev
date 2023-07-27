import cors from "cors";
import express from "express";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // criar as rotas

  return app;
};
