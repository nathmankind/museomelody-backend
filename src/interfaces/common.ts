import { Request } from "express";

//to extends the express request
export interface ExtendApiReq extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}
