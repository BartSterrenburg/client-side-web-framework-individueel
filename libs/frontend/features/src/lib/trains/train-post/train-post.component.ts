import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Train } from './../../../../../../shared/services/train/train.model';



@Component({
    selector: 'train-repo-train-post',
    templateUrl: './train-post.component.html',
    styleUrls: ['./train-post.component.css']
})
export class TrainPostComponent {
    constructor(private router: Router) {}

    saveTrain(formData: string): void {
    }
}
