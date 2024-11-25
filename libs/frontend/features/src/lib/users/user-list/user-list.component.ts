import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserRole, UserGender } from '@train-repo/shared/api';
import { UserService } from '../../../../../../shared/services/user/user.service';

@Component({
    selector: 'train-repo-user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    users: IUserInfo[] = [];

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.userService
            .getUsersAsObservable()
            .subscribe((users) => (this.users = users));
    }
}
