import { Response } from "express";

export interface IRequest {
  access_token: string;
  id_token: string;
  res: Response;
}
