import { Route } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from 'libs/frontend/features/src/lib/users/user-list/user-list.component';
import { UserDetailsComponent } from 'libs/frontend/features/src/lib/users/user-details/user-details.component';
import { TrainListComponent } from 'libs/frontend/features/src/lib/trains/train-list/train-list.component'
import { TrainDetailsComponent } from 'libs/frontend/features/src/lib/trains/train-details/train-details.component'
import { TrainPostComponent } from 'libs/frontend/features/src/lib/trains/train-post/train-post.component';

export const appRoutes: Route[] = [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
    {path: 'about', component: AboutComponent, pathMatch: 'full'},
    {path: 'user', component: UserListComponent, pathMatch: 'full'},
    {path: 'train', component: TrainListComponent, pathMatch: 'full'},
    {path: 'user/:id', component: UserDetailsComponent, pathMatch: 'full'},
    {path: 'train/:id', component: TrainDetailsComponent, pathMatch: 'full'},
    {path: 'train-post', component: TrainPostComponent, pathMatch: 'full'}
];