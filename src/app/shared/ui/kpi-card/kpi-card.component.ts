import { Component, input } from '@angular/core';

@Component({ selector: 'app-kpi-card', standalone: true, templateUrl: './kpi-card.component.html' })
export class KpiCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly delta = input.required<number>();
  readonly tone = input('violet');
}
