import {Component, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer, ViewChild} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/primeng';
import {AppComponent} from './app.component';

declare var jQuery: any;

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() reset: boolean;

    model: any[];

    layoutMenuScroller: HTMLDivElement;

    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    constructor(private app: AppComponent) {}

    ngOnInit() {
        this.model = [
            {label: 'DASHBOARD', icon: 'fa fa-fw fa-home', routerLink: ['/']},
            {
                label: 'CUSTOMIZATION', icon: 'fa fa-fw fa-gear',
                items: [
                    {
                        label: 'Menu', icon: 'fa fa-fw fa-bars',
                        items: [
                            {label: 'Horizontal', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'horizontal' },
                            {label: 'Static', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'static' },
                            {label: 'Overlay', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'overlay' },
                            {label: 'Popup', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'popup' }
                        ]
                    }
                ]
            },
            {
                label: 'THEMES', icon: 'fa fa-fw fa-paint-brush',
                items: [
                    {label: 'Blue - Pink', icon: 'fa fa-fw fa-diamond', command: (event) => {this.changeTheme('blue'); }},
                    {label: 'Teal - Red', icon: 'fa fa-fw fa-diamond', command: (event) => {this.changeTheme('teal'); }},
                    {label: 'Blue - Orange', icon: 'fa fa-fw fa-diamond', command: (event) => {this.changeTheme('nightblue'); }},
                    {label: 'Grey - Green', icon: 'fa fa-fw fa-diamond', command: (event) => {this.changeTheme('grey'); }},
                    {label: 'Blue Grey - Green', icon: 'fa fa-fw fa-diamond', command: (event) => {this.changeTheme('bluegrey'); }},
                    {label: 'Amber - Purple', icon: 'fa fa-fw fa-diamond', command: (event) => {this.changeTheme('amber'); }},
                    {label: 'Dark Blue - Turquoise', icon: 'fa fa-fw fa-diamond', command: (event) => {this.changeTheme('darkblue'); }},
                    {label: 'Turquoise - Red', icon: 'fa fa-fw fa-diamond', command: (event) => {this.changeTheme('turquoise'); }},
                    {label: 'Purple - Pink', icon: 'fa fa-fw fa-diamond', command: (event) => {this.changeTheme('purple'); }},
                    {label: 'Pink - Purple', icon: 'fa fa-fw fa-diamond', command: (event) => {this.changeTheme('pink'); }}
                ]
            },
            {
                label: 'COMPONENTS', icon: 'fa fa-fw fa-sitemap',
                items: [
                    {label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/sample']},
                    {label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/forms']},
                    {label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/data']},
                    {label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/panels']},
                    {label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/overlays']},
                    {label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/menus']},
                    {label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/messages']},
                    {label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/charts']},
                    {label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/file']},
                    {label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/misc']}
                ]
            },
            {
                label: 'TEMPLATE PAGES', icon: 'fa fa-fw fa-life-saver',
                items: [
                    {label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/empty']},
                    {label: 'Landing Page', icon: 'fa fa-fw fa-globe', url: 'assets/pages/landing.html', target: '_blank'},
                    {label: 'Login Page', icon: 'fa fa-fw fa-sign-in', url: 'assets/pages/login.html', target: '_blank'},
                    {label: 'Error Page', icon: 'fa fa-fw fa-exclamation-circle', url: 'assets/pages/error.html', target: '_blank'},
                    {label: '404 Page', icon: 'fa fa-fw fa-times', url: 'assets/pages/404.html', target: '_blank'},
                    {label: 'Access Denied Page', icon: 'fa fa-fw fa-exclamation-triangle',
                      url: 'assets/pages/access.html', target: '_blank'}
                ]
            },
            {
                label: 'MENU HIERARCHY', icon: 'fa fa-fw fa-gg',
                items: [
                    {
                        label: 'Submenu 1', icon: 'fa fa-fw fa-sign-in',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 1.1.2', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 1.1.3', icon: 'fa fa-fw fa-sign-in'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 1.2.2', icon: 'fa fa-fw fa-sign-in'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'fa fa-fw fa-sign-in',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 2.1.2', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 2.1.3', icon: 'fa fa-fw fa-sign-in'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 2.2.2', icon: 'fa fa-fw fa-sign-in'}
                                ]
                            },
                        ]
                    }
                ]
            },
            {label: 'UTILS', icon: 'fa fa-fw fa-wrench', routerLink: ['/utils']},
            {label: 'DOCUMENTATION', icon: 'fa fa-fw fa-book', routerLink: ['/documentation']}
        ];
    }

    ngAfterViewInit() {
        /*this.layoutMenuScroller = <HTMLDivElement> this.layoutMenuScrollerViewChild.nativeElement;

        setTimeout(() => {
            jQuery(this.layoutMenuScroller).nanoScroller({flash: true});
        }, 10);*/
    }

    changeTheme(theme) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        themeLink.href = 'assets/theme/theme-' + theme + '.css';
        const layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
    }

    updateNanoScroll() {
        setTimeout(() => {
            jQuery(this.layoutMenuScroller).nanoScroller();
        }, 500);
    }

    ngOnDestroy() {
        //jQuery(this.layoutMenuScroller).nanoScroller({flash: true});
    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink"
                   [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                    (mouseenter)="hover=true" (mouseleave)="hover=false">
                    <i [ngClass]="child.icon"></i>
                    <span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down layout-submenu-toggler" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>

                <a (click)="itemClick($event,child,i)" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                    (mouseenter)="hover=true" (mouseleave)="hover=false">
                    <i [ngClass]="child.icon"></i>
                    <span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset"
                    [@children]="isActive(i) ? 'visible' : 'hidden'"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('visible', style({
                height: '*'
            })),
            state('hidden', style({
                height: '0px'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _reset: boolean;

    activeIndex: number;

    hover: boolean;

    constructor(public app: AppComponent, public router: Router, public location: Location) {}

    itemClick(event: Event, item: MenuItem, index: number) {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        if (item.routerLink || item.items || item.command || item.url) {
            this.activeIndex = (this.activeIndex === index) ? null : index;
        }

        // execute command
        if (item.command) {
            item.command({originalEvent: event, item: item});
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }

    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;
    }
}
