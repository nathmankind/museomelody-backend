import { Request } from 'express';
import { Role } from 'src/modules/auth/enums/role.enum';

//to extends the express request
export interface ExtendApiReq extends Request {
  user: {
    userId: string;
    email: string;
    role: Role;
  };
}
