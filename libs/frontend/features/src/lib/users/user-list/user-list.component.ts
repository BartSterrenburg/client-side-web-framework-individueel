import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserRole, UserGender } from '@train-repo/shared/api';
import { UserService } from '../user.service';

@Component({
    selector: 'train-repo-user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    users: IUserInfo[] = [];

    constructor(private userSercice: UserService) {}

    ngOnInit(): void {
        this.userSercice
            .getUsersAsync()
            .subscribe((users) => (this.users = users));
    }

    // [
    //     {
    //         _id: "1",
    //         name: "robin",
    //         emailAddress: "r.schellius@avans.nl",
    //         role: UserRole.Unknown,
    //         gender: UserGender.Unknown,
    //         password: "secret",
    //         isActive: true,
    //         profileImgUrl: "url"
    //     },
    //     {
    //         _id: "2",
    //         name: "Davide",
    //         emailAddress: "d.ambesi@avans.nl",
    //         role: UserRole.Unknown,
    //         gender: UserGender.Unknown,
    //         password: "secret",
    //         isActive: true,
    //         profileImgUrl: "url"
    //     }
    // ]
}
