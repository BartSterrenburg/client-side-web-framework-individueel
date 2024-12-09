import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserInfo, UserRole, UserGender } from '@train-repo/shared/api';
import { UserService } from '../../../../../../shared/services/user/user.service';

@Component({
    selector: 'train-repo-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    users: IUserInfo[] = [];

    constructor(
        private userService: UserService, 
        private router: Router
    ){}

    postUserForm(): void {
        this.router.navigate(['/user-post']);
    }

    goToDetail(userId: string): void {
        this.router.navigate([`/user/${userId}`]);
      }

    ngOnInit(): void {
        this.userService
            .getUsers()
            .subscribe((users) => (this.users = users));
    }
}
