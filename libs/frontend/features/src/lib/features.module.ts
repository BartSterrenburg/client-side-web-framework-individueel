import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { TrainListComponent } from './trains/train-list/train-list.component';
import { UserPostComponent } from './users/user-post/user-post.component';
import { provideHttpClient } from '@angular/common/http';
import { TrainPostComponent } from './trains/train-post/train-post.component';
import { TrainEditComponent } from './trains/train-edit/train-edit.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
        UserDetailsComponent,
        UserDetailsComponent,
        UserListComponent,
        UserEditComponent,
        UserPostComponent,
        TrainListComponent,
        TrainPostComponent,
        TrainEditComponent
    ],
    exports: [UserListComponent, UserDetailsComponent, UserEditComponent],
    providers: [provideHttpClient()]
})
export class FeaturesModule {}
