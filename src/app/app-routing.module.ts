import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import {AuthGuard} from "./guards/auth.guard";
import {AuthLoginComponent} from "./components/channel/auth-login/auth-login.component";
import {HomeComponent as ChatHomeComponent} from "./components/channel/chats/home/home.component";
import {UnauthorizedComponent} from "./components/channel/unauthorized/unauthorized.component";
import {ListComponent as ChatListComponent} from "./components/channel/chats/list/list.component";

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', component: ChatHomeComponent, canActivate: [AuthGuard] },
            { path: 'chats', component: ChatListComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'login', data: { breadcrumb: 'Login' }, component: AuthLoginComponent },
    { path: 'unauthorized', data: { breadcrumb: 'Unauthorized' }, component: UnauthorizedComponent },
    { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
