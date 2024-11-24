import { Component } from '@angular/core';
import { ImageLibrary } from './../../../assets/imagedata';

@Component({
    selector: 'train-repo-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    welcomeImage = ImageLibrary.welcomeImage;
}
