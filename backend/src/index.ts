import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { logger } from "./lib/logger";
import { handleError } from "./lib/error";
import { env } from "./lib/zodSchema";
import { mainRoutes } from "./routes";

const app = express();

// use cors
app.use(cors());

// use json
app.use(express.json());

// use urlencoded
app.use(express.urlencoded({ extended: true }));

// logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// routes
app.use("/api/v1", mainRoutes);

// error
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  handleError(err, req, res);
});

const port = env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
