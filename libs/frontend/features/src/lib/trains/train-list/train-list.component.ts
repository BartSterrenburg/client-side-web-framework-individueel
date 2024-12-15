import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainService } from './../../../../../../shared/services/train/train.service';
import { Train } from './../../../../../../shared/services/train/train.model';
import { AuthService } from 'libs/shared/services/auth/auth.service';

@Component({
  selector: 'train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css'],
})
export class TrainListComponent implements OnInit {
  trains: Train[] = [];

  constructor(
    private trainService: TrainService,
    public authService: AuthService, // Maak AuthService openbaar zodat het in de template kan worden gebruikt
    private router: Router
  ) {}

  goToDetail(trainId: string): void {
    this.router.navigate([`/train/${trainId}`]);
  }

  postTrainForm(): void {
    this.router.navigate(['/train-post']);
  }

  deleteTrain(id: string): void {
    this.trainService.deleteTrain(id);
  }

  ngOnInit(): void {
    this.trainService.getTrains().subscribe((trains) => {
      this.trains = trains;
    });
  }
}
