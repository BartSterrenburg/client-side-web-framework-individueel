import { Route } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from 'libs/frontend/features/src/lib/users/user-list/user-list.component';
import { UserDetailsComponent } from 'libs/frontend/features/src/lib/users/user-details/user-details.component';
import { TrainListComponent } from 'libs/frontend/features/src/lib/trains/train-list/train-list.component'
import { TrainDetailsComponent } from 'libs/frontend/features/src/lib/trains/train-details/train-details.component'
import { TrainPostComponent } from 'libs/frontend/features/src/lib/trains/train-post/train-post.component';
import { TrainEditComponent } from 'libs/frontend/features/src/lib/trains/train-edit/train-edit.component';
import { UserEditComponent } from 'libs/frontend/features/src/lib/users/user-edit/user-edit.component';
import { UserPostComponent } from 'libs/frontend/features/src/lib/users/user-post/user-post.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';





export const appRoutes: Route[] = [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
    {path: 'about', component: AboutComponent, pathMatch: 'full'},
    {path: 'user', component: UserListComponent, pathMatch: 'full'},
    {path: 'user/:id', component: UserDetailsComponent, pathMatch: 'full'},
    {path: 'user-post', component: UserPostComponent, pathMatch: 'full'},
    {path: 'user-edit/:id', component: UserEditComponent, pathMatch: 'full'},
    {path: 'train', component: TrainListComponent, pathMatch: 'full'},
    {path: 'train/:id', component: TrainDetailsComponent, pathMatch: 'full'},
    {path: 'train-post', component: TrainPostComponent, pathMatch: 'full'},
    {path: 'train-edit/:id', component: TrainEditComponent, pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, pathMatch: 'full'},
    {path: 'login', component: LoginComponent, pathMatch: 'full'}
];