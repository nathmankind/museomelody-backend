import { Request } from 'express';
import { Role } from '../modules/auth/enums/role.enum';

export interface TokenPayload {
  userId: string;
  email: string;
  role: Role;
}

//to extends the express request
export interface ExtendApiReq extends Request {
  user: TokenPayload;
}
