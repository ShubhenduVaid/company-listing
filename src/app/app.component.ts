import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MockLoginComponent } from './components/mock-login/mock-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MockLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'risk-narrative-app';
}
