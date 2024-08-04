import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        RouterLink,
        NgClass,
        ButtonModule,
        InputTextModule,
        RippleModule,
        AppConfigModule
    ],
    templateUrl: './auth-login.component.html',
})
export class AuthLoginComponent {

    constructor(private layoutService: LayoutService) {}

    get filledInput(): boolean {
        return this.layoutService.config().inputStyle === 'filled';
    }

}
