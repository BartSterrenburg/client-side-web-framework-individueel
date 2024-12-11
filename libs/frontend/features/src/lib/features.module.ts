import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { TrainListComponent } from './trains/train-list/train-list.component';
import { UserPostComponent } from './users/user-post/user-post.component';
import { provideHttpClient } from '@angular/common/http';
import { TrainPostComponent } from './trains/train-post/train-post.component';
import { TrainEditComponent } from './trains/train-edit/train-edit.component';
import { AlertComponent } from './alert/alert.component'
import { TrainDetailsComponent } from './trains/train-details/train-details.component';

@NgModule({
    imports: [CommonModule, FormsModule, NgbAlertModule],
    declarations: [
        UserDetailsComponent,
        UserDetailsComponent,
        UserListComponent,
        UserEditComponent,
        UserPostComponent,
        TrainListComponent,
        TrainPostComponent,
        TrainEditComponent,
        TrainDetailsComponent,
        AlertComponent
    ],
    exports: [AlertComponent, UserListComponent, UserDetailsComponent, UserEditComponent],
    providers: [provideHttpClient()]
})
export class FeaturesModule {}
