import { Acces } from './Acces';

export class Role {
  id!: number;
  labelFr!: string;
  labelAr!: string;
  listeAccess?: (Acces)[] | null;
  deleted!: boolean;
}
