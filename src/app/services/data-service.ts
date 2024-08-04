import {Injectable} from "@angular/core";
import {User} from "./models/user";
import {BehaviorSubject} from "rxjs";
import {KeycloakProfile} from "keycloak-js";
import {roleNameSysAdmin, roleNameAdmin} from "../constants";

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private _user = new BehaviorSubject<User>({
        id: '',
        fullName: '',
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
        isAdmin: false
    });
    private _userRoles : any = {
        realm: [],
        resource: []
    }

    setUserRoles(realmRoles: string[], resourceRoles: string[]) {
        this._userRoles = {
            realm: realmRoles,
            resource: resourceRoles
        }
    }

    get userRoleCount() : number {
        return this._userRoles.realm.length + this._userRoles.resource.length
    }

    setUser(user: KeycloakProfile) {
        if (this._userRoles.realm.includes(roleNameSysAdmin))
            this._userRoles.resource.push(roleNameSysAdmin)
        const u = this.getUser()
        u.id = user.id
        u.firstName = user.firstName ?? ''
        u.lastName = user.lastName ?? ''
        u.fullName = u.firstName + ' ' + u.lastName
        u.email = user.email ?? ''
        u.roles = this._userRoles.resource
        u.isAdmin = this._userRoles.resource.includes(roleNameSysAdmin) || this._userRoles.resource.includes(roleNameAdmin)
        this._user.next(u)
    }

    getUser() {
        return this._user.value
    }
}

