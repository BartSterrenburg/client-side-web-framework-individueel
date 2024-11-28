import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { IUserInfo, UserRole, UserGender } from './../../../../../../shared/services/user/user.model';
import { UserService } from './../../../../../../shared/services/user/user.service'

@Component({
    selector: 'train-repo-user-post',
    templateUrl: './user-post.component.html',
    styles: []
})
export class UserPostComponent {

    newUser: IUserInfo = {
        _id: '',
        name: '',
        emailAddress: '',
        profileImgUrl: '',
        role: UserRole.Unknown,
        gender: UserGender.Unknown,
        isActive: true,
        password: ''
    }
    
    constructor(private userService: UserService, private router: Router) {}


    onSubmit() {
        this.userService.addUser(this.newUser);
        this.router.navigate(['/user']);
    }
}
