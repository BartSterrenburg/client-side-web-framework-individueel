import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IUserInfo, UserGender, UserRole } from './../../../../../../shared/services/user/user.model';
import { UserService } from './../../../../../../shared/services/user/user.service';

@Component({
    selector: 'train-repo-user-edit',
    templateUrl: './user-edit.component.html',
    styles: []
})
export class UserEditComponent implements OnInit {
    userId: string | null = null;

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

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}
    
    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
          this.userId = params.get('id');
            if(this.userId) {
              this.newUser = this.userService.getUserById(this.userId!);
            }
          });    
    }

    onSubmit() {
        this.route.paramMap.subscribe((params) => {
            this.userId = params.get('id');
            if (this.userId) {
                console.log("trainid:" + this.userId)
                this.userService.editUser(this.userId, this.newUser).subscribe(data => {
                    console.log(data);
                });
                this.router.navigate(['/user']);
            }
        });    
    }
}
