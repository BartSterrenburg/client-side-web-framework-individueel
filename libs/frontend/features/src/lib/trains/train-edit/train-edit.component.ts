import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TrainService } from 'libs/shared/services/train/train.service';
import { Train, TrainSort } from './../../../../../../shared/services/train/train.model';


@Component({
    selector: 'train-edit',
    templateUrl: './train-edit.component.html',
    styles: []
})
export class TrainEditComponent implements OnInit {
    constructor(private trainService: TrainService, private router: Router, private route: ActivatedRoute,
    ) {}
    

    trainId: string | null = null;

    newTrain: Train = {
        _id: '',
        sort: TrainSort.Unkown,
        name: '',
        operator: '',
        model: '',
        capacity: 0,
        numberOfWagons: 0,
        maxSpeed: 0,
        propulsion: '',
        length: 0,
        manufactureYear: 0,
        manufacturer: '',
        weight: 0,
        energyConsumption: 0,
        facilities: []
      };


    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.trainId = params.get('id');
            if (this.trainId) {
              this.trainService.getTrains().subscribe((trains) => {
                const train = trains.find(t => t._id === this.trainId);
                if (train) {
                  this.newTrain = train;
                } else {
                  console.log("Train not found");
                }
              });
            }
          });
    }

    onSubmit(): void {


        this.route.paramMap.subscribe((params) => {
            this.trainId = params.get('id');
            if (this.trainId) {
                console.log("trainid:" + this.trainId)
                this.trainService.editTrain(this.trainId, this.newTrain).subscribe(data => {
                  console.log(data);
                });
                this.router.navigate(['/train']);
            }
        });
    }
}
