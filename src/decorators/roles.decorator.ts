import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/auth/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [Role, ...Role[]]) =>
  SetMetadata(ROLES_KEY, roles);
