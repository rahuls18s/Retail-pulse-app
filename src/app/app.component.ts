import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly navigation = [
    { label: 'Overview', path: '/overview', icon: 'O' },
    { label: 'Simulation Lab', path: '/simulation', icon: 'S' },
    { label: 'Products', path: '/products', icon: 'P' },
    { label: 'Consumers', path: '/consumers', icon: 'C' },
    { label: 'Regions', path: '/regions', icon: 'R' },
    { label: 'Competitors', path: '/competitors', icon: 'C' },
    { label: 'Scenarios', path: '/scenarios', icon: 'S' },
    { label: 'Live Transactions', path: '/live', icon: 'L' },
    { label: 'Performance Lab', path: '/performance', icon: 'P' },
  ];
}
