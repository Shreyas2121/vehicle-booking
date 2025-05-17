import { NextFunction, Request, Response } from "express";

export type Fn = (req: Request, res: Response, next: NextFunction) => void;
