import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { TrainListComponent } from './trains/train-list/train-list.component';

import { provideHttpClient } from '@angular/common/http';

@NgModule({
    imports: [CommonModule],
    declarations: [
        UserDetailsComponent,
        UserDetailsComponent,
        UserListComponent,
        UserEditComponent,        
        TrainListComponent
    ],
    exports: [
        UserListComponent, 
        UserDetailsComponent, 
        UserEditComponent
    ],
    providers: [provideHttpClient()]
})
export class FeaturesModule {}
