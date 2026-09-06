import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly actionLabel = input('');
  readonly action = output<void>();
}
