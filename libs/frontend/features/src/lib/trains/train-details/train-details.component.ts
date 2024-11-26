import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Train } from './../../../../../../shared/services/train/train.model'
import { TrainService } from './../../../../../../shared/services/train/train.service'
import { ImageLibrary } from './../../../../../../../apps/my-app/src/assets/imagedata'



@Component({
    selector: 'train-details',
    templateUrl: './train-details.component.html',
    styles: []
})
export class TrainDetailsComponent implements OnInit{
    trainId: string | null = null;
    train: Train | null = null;
    image = ImageLibrary.welcomeImage;

  constructor(
    private route: ActivatedRoute,
    private trainService: TrainService
  ) {}

  deleteTrain(id: string): void {
    if (id) {
      this.trainService.deleteTrain(id);
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.trainId = params.get('id');
      if (this.trainId) {
        this.trainService.getTrains().subscribe((trains) => {
          const train = trains.find(t => t.id === this.trainId);
          if (train) {
            this.train = train;
          } else {
            console.log("Train not found");
          }
        });
      }
    });
  }
  
}
