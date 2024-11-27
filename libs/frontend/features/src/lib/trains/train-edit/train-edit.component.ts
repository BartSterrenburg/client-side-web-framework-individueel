import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TrainService } from 'libs/shared/services/train/train.service';
import { Train, TrainSort } from './../../../../../../shared/services/train/train.model';


@Component({
    selector: 'train-edit',
    templateUrl: './train-edit.component.html',
    styles: []
})
export class TrainEditComponent {
    constructor(private trainService: TrainService, private router: Router, private route: ActivatedRoute,
    ) {}


    trainId: string | null = null;

    newTrain: Train = {
        id: '',
        sort: TrainSort.Unkown,
        name: '',
        operator: '',
        model: '',
        capacity: -1,
        numberOfWagons: -1,
        maxSpeed: -1,
        propulsion: '',
        length: -1,
        manufactureYear: -1,
        manufacturer: '',
        weight: -1,
        energyConsumption: -1,
        facilities: []
    };


    onSubmit(): void {
        console.log(`id: ${this.newTrain.id}`);
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

        this.route.paramMap.subscribe((params) => {
            this.trainId = params.get('id');
            if (this.trainId) {
                console.log("trainid:" + this.trainId)
                this.trainService.editTrain(this.trainId, this.newTrain);
            }
        });
    }
}
