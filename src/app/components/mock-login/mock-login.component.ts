import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-mock-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './mock-login.component.html',
  styleUrl: './mock-login.component.css',
})
export class MockLoginComponent implements OnInit {
  isAuth: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuth = this.authService.isLoggedIn();
  }

  onToggle(event: MatSlideToggleChange): void {
    if (event.checked) {
      this.isAuth = true;
      this.authService.login();
    } else {
      this.isAuth = false;
      this.authService.logout();
    }
  }
}
