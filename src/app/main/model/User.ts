import { Role } from './Role';

export class User {
  id!: number;
  lastName!: string;
  firstName!: string;
  email?: null;
  pwd?: null;
  active?: null;
  ldapAuthentication?: null;
  roles?: (Role)[] | null;
  deleted!: boolean;
}


