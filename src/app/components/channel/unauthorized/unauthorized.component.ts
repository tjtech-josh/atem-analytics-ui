import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {Router, RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";


@Component({
    selector: 'unauthorized',
    standalone: true,
    imports: [
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        RouterLink,
        NgOptimizedImage
    ],
    templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent implements OnInit{
    constructor() { }

    get dark(): boolean {
        return true
    }

    ngOnInit() {

    }
}
