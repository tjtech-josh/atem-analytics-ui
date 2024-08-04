import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {DataService} from "../services/data-service";
import {MenuService} from "./app.menu.service";
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    menu: MenuItem[] = [];

    @ViewChild('searchinput') searchInput!: ElementRef;

    @ViewChild('menubutton') menuButton!: ElementRef;

    searchActive: boolean = false;

    constructor(
        public layoutService: LayoutService,
        protected dataService: DataService,
        protected keycloakService: KeycloakService) {}

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    removeTab(event: MouseEvent, item: MenuItem, index: number) {
        this.layoutService.onTabClose(item, index);
        event.preventDefault();
    }

    get layoutTheme(): string {
        return this.layoutService.config().layoutTheme;
    }

    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }

    get logo(): string {
        const path = 'assets/layout/images/logo-';
        const logo = (this.layoutTheme === 'primaryColor'  && !(this.layoutService.config().theme  == "yellow")) ? 'light.png' : (this.colorScheme === 'light' ? 'dark.png' : 'light.png');
        return path + logo;
    }

    get tabs(): MenuItem[] {
        return this.layoutService.tabs;
    }

    async logout() {
        const redirectUrl = environment.keycloakRedirectUri + '#/login';
        console.log(redirectUrl);
        await this.keycloakService.logout(redirectUrl);
    }
}
