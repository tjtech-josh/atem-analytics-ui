import {APP_INITIALIZER, NgModule} from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import {KeycloakService} from "keycloak-angular";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {DefaultInterceptor} from "./interceptors/DefaultInterceptor";
import {environment} from "../environments/environment";

export function initializeKeycloak(
    keycloak: KeycloakService
) {
    return () =>
        keycloak.init({
            config:{
                url: environment.keycloakUrl,
                realm: environment.keycloakRealm,
                clientId: environment.keycloakClientId
            },
            loadUserProfileAtStartUp: true,
            initOptions: {
                onLoad: 'check-sso',
                redirectUri: window.location.href
            }
        });
}

@NgModule({
    imports: [
        AppLayoutModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService]
        },
        KeycloakService,
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
