import { Component, OnInit } from '@angular/core';
import { AuthService } from 'libs/shared/services/auth/auth.service';

@Component({
  selector: 'train-repo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Luister naar wijzigingen in de inlogstatus
    this.authService.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user; // Zet true als er een gebruiker is ingelogd
    });
  }

  logout() {
    this.authService.logout();
  }
}
