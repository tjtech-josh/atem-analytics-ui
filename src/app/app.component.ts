import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {AppConfig, LayoutService} from "./layout/service/app.layout.service";
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";
import {DataService} from "./services/data-service";
import {environment} from "../environments/environment";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig,
        private layoutService: LayoutService,
        private keycloakService: KeycloakService,
        private router: Router,
        private dataService: DataService) { }

    async ngOnInit() {
        this.primengConfig.ripple = true;
        const config: AppConfig = {
            ripple: false,
            inputStyle: 'outlined',
            menuMode: 'slim',
            colorScheme: 'light',
            theme: 'blue',
            layoutTheme: 'primaryColor',
            scale: 14
        };
        this.layoutService.config.set(config);
        if (!this.keycloakService.isLoggedIn()
            && !window.location.href.includes('unauthorized')) {
            await this.router.navigate(['login'])
            return
        } else if (window.location.href.includes('unauthorized')) {
            return
        }

        const realmRoles = this.keycloakService.getUserRoles(true, 'x')
        const resourceRoles = this.keycloakService.getUserRoles(false, environment.keycloakClientId)
        this.dataService.setUserRoles(realmRoles, resourceRoles)

        this.keycloakService.loadUserProfile().then(data => {
            this.dataService.setUser(data)
        })

        if (this.dataService.userRoleCount === 0)
        {
            const redirectUrl = environment.keycloakRedirectUri + '#/unauthorized';
            await this.keycloakService.logout(redirectUrl)
            await this.router.navigate(['unauthorized'])
            return
        }
    }
}

