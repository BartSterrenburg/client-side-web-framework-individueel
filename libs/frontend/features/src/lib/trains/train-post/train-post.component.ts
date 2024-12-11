import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainService } from 'libs/shared/services/train/train.service';
import { Train, TrainSort } from './../../../../../../shared/services/train/train.model';
import { IUserInfo } from 'libs/shared/services/user/user.model';



@Component({
    selector: 'train-repo-train-post',
    templateUrl: './train-post.component.html',
    styleUrls: ['./train-post.component.css']
})
export class TrainPostComponent {
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
        owner: {} as IUserInfo,
        facilities: []
      };
    constructor(
        private router: Router, 
        private trainService: TrainService
    ) {}


    onSubmit(): void {
        this.trainService.addTrain(this.newTrain).subscribe(data =>
            console.log(data)
        );
        this.router.navigate(['/train']);
    }
      
}
