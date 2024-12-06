import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'libs/shared/services/auth/auth.service';

@Component({
    selector: 'train-repo-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})


// TO DO: something to reload nav items when looged in/out
export class HeaderComponent implements OnInit {
    isLoggedIn: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.checkIfLoggedIn();
    }
    
    public checkIfLoggedIn(): void {
        const token = this.authService.getTokenFromLocalStorage();

        if(token) {
            if(this.authService.validateToken(token)) {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        } else {
            this.isLoggedIn = false;
        }
    }
}
