import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainService } from './../../../../../../shared/services/train/train.service';
import { Train } from './../../../../../../shared/services/train/train.model';

@Component({
  selector: 'train-list',
  templateUrl: './train-list.component.html',
})
export class TrainListComponent implements OnInit {
  trains: Train[] = [];

  constructor(
    private trainService: TrainService,
    private router: Router
  ) {}

  goToDetail(trainId: number): void {
    this.router.navigate([`/train/${trainId}`]);
  }

  postTrainForm(): void {
    this.router.navigate(['/train-post']);
  }

  // Methode om de trein te verwijderen
  deleteTrain(id: number): void {
    this.trainService.deleteTrain(id);  // Verwijder de trein uit de service
  }

  ngOnInit(): void {
    // Luister naar veranderingen in de lijst van treinen
    this.trainService.getTrains().subscribe((trains) => {
      this.trains = trains; // Update de lijst van treinen
    });
  }
}
