import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Train } from './../../../../../../shared/services/train/train.model'
import { TrainService } from './../../../../../../shared/services/train/train.service'
import { ImageLibrary } from './../../../../../../../apps/my-app/src/assets/imagedata'
import { AuthService } from 'libs/shared/services/auth/auth.service';
import { IUserInfo } from 'libs/shared/services/user/user.model';



@Component({
    selector: 'train-details',
    templateUrl: './train-details.component.html',
    styleUrls: ['./train-details.component.css']
})
export class TrainDetailsComponent implements OnInit{
  image = ImageLibrary.welcomeImage;
  trainId: string | null = null;
  train: Train | null = null;
  user: IUserInfo | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainService: TrainService,
    private authService: AuthService
  ) {}

  RouteEditTrainForm(id: string) {
    this.router.navigate([`/train-edit/${id}`]);
  }

  RoutePostForm(id: string) {
    this.router.navigate([`/trainpost-post/${id}`]);
  }

  RoutePosts(id: string) {
    this.router.navigate([`/train/${id}/trainpost`])
  }

  RouteTrainFinder(id: string) {
    this.router.navigate([`/train/${id}/trainfinder`])
  }

  deleteTrain(id: string): void {
    if (id) {
      this.trainService.deleteTrain(id).subscribe(data => {
        console.log(data);
      });
      this.router.navigate(['/train']);
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.trainId = params.get('id');
      if (this.trainId) {
        this.trainService.getTrains().subscribe((trains) => {
          const train = trains.find(t => t._id === this.trainId);
          console.log(train);
          if (train) {
            this.train = train;
          } else {
            console.log("Train not found");
          }
        });
      }
    });

    this.authService.getUserFromLocalStorage().subscribe((currentUser) => {
      this.user = currentUser;
      console.log(this.user);
    });
  }
  
}
