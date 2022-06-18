import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Autorities {
    
    static readonly AUTORITIES_MAP : Map<string, Array<string>> = 
    new Map([
        ["users", ["ADMIN", "USERS_MANAGEMENT"]],
        ["roles", ["ADMIN", "ROLES_MANAGEMENT"]],
        ["settings", ["ADMIN"]]
    ]);

}
