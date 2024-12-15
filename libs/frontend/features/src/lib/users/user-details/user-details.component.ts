import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserInfo } from './../../../../../../shared/services/user/user.model';
import { UserService } from './../../../../../../shared/services/user/user.service';
import { AuthService } from './../../../../../../shared/services/auth/auth.service';

@Component({
  selector: 'train-repo-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;
  user: IUserInfo | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public authService: AuthService
  ) {}

  deleteUser(id: string): void {
    if (id) {
      this.userService.deleteUser(id).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/user']);
      });
    }
  }

  RouteEditUserForm(id: string): void {
    this.router.navigate([`/user-edit/${id}`]);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe((user) => {
          this.user = user; 
          console.log(this.user?._id + " " + this.userId)

        });
      }
    });
  }

}
