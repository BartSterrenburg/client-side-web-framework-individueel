import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Train } from './../../../../../../shared/services/train/train.model'
import { TrainService } from './../../../../../../shared/services/train/train.service'

@Component({
    selector: 'train-list',
    templateUrl: './train-list.component.html',
})

export class TrainListComponent implements OnInit {
  trains: Train[] = [];

  constructor(private trainService: TrainService,
    private router: Router
  ) {}

  goToDetail(trainId: number): void {
    this.router.navigate([`/train/${trainId}`]);
  }

  goToPostTrainForm(): void {
    this.router.navigate(['/train-post']);
  }

  ngOnInit(): void {
    this.trains = this.trainService.getTrains();
  }
}
