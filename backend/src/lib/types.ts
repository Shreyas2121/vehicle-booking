import { NextFunction, Request, Response } from "express";
import { db } from "../db";

export type Fn = (req: Request, res: Response, next: NextFunction) => void;
export type TransactionType = Parameters<
  Parameters<typeof db.transaction>[0]
>[0];
