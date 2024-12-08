import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IUserInfo } from './../../../../../../shared/services/user/user.model'
import { UserService } from './../../../../../../shared/services/user/user.service'
import { Observable } from 'rxjs';

@Component({
    selector: 'train-repo-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: []
})
export class UserDetailsComponent implements OnInit{
  userId: string | null = null;
  user: IUserInfo | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  deleteUser(id: string): void {
    if (id) {
      this.userService.deleteUser(id).subscribe(data => {
        console.log(data);
      })
      this.router.navigate(['/user']);
    }
  }

  RouteEditUserForm(id: string) {
    this.router.navigate([`/user-edit/${id}`]);
  }

  ngOnInit(): void {
  this.route.paramMap.subscribe((params) => {
    this.userId = params.get('id');
      if(this.userId) {
        this.user = this.userService.getUserById(this.userId!);
      }
    });    
  }
}
