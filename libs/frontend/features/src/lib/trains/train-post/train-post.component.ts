import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'train-repo-train-post',
    templateUrl: './train-post.component.html',
    styleUrls: ['./train-post.component.css']
})
export class TrainPostComponent {
    constructor(private router: Router) {}
}
