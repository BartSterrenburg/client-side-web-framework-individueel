import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainService } from 'libs/shared/services/train/train.service';
import { Train, TrainSort } from './../../../../../../shared/services/train/train.model';



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
        facilities: []
      };
    constructor(
        private router: Router, 
        private trainService: TrainService
    ) {}


    onSubmit(): void {
        console.log(`id: ${this.newTrain._id}`);
        console.log(`sort: ${this.newTrain.sort}`);
        console.log(`name: ${this.newTrain.name}`);
        console.log(`operator: ${this.newTrain.operator}`);
        console.log(`model: ${this.newTrain.model}`);
        console.log(`capacity: ${this.newTrain.capacity}`);
        console.log(`numberOfWagons: ${this.newTrain.numberOfWagons}`);
        console.log(`maxSpeed: ${this.newTrain.maxSpeed}`);
        console.log(`propulsion: ${this.newTrain.propulsion}`);
        console.log(`length: ${this.newTrain.length}`);
        console.log(`manufactureYear: ${this.newTrain.manufactureYear}`);
        console.log(`manufacturer: ${this.newTrain.manufacturer}`);
        console.log(`weight: ${this.newTrain.weight}`);
        console.log(`energyConsumption: ${this.newTrain.energyConsumption}`);

        this.trainService.addTrain(this.newTrain);
        this.router.navigate(['/train']);
    }
      
}
