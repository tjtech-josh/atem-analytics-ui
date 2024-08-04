import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeycloakService} from "keycloak-angular";

@Injectable({
    providedIn: 'root'
})
export class DefaultInterceptor implements HttpInterceptor {
    token: string | undefined = ''
    constructor(private keycloakService: KeycloakService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const keycloakToken = this.keycloakService.getKeycloakInstance().token
        if (keycloakToken) {
            const updatedReq = request.clone({
                headers: request.headers
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', `Bearer ${keycloakToken}`)
            });
            return next.handle(updatedReq);
        }
        return next.handle(request);
    }
}
