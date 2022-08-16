import {Component} from '@angular/core';
import {LayoutService} from "./service/app.layout.service";

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {
    constructor(public layoutService: LayoutService) {}

    get layoutColor(): string {
        return this.layoutService.config.layoutColor;
    }/*

    set layoutColor(_val) {
        this.layoutService.config.layoutColor = _val;
    }*/
}
