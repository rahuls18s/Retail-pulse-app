import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RetailDataService } from '../../core/services/retail-data.service';
import { SimulationEngineService } from '../../core/services/simulation-engine.service';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-explorer',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './explorer.component.html',
})
export class ExplorerComponent {
  readonly route = inject(ActivatedRoute);
  readonly data = inject(RetailDataService);
  readonly engine = inject(SimulationEngineService);
  readonly kind = this.route.snapshot.data['kind'] as string;
  readonly regions = [
    { name: 'Bengaluru', revenue: 3400000, growth: 9.1, accent: '#6d5dfc' },
    { name: 'Chennai', revenue: 2800000, growth: 7.2, accent: '#15b8a6' },
    { name: 'Mumbai', revenue: 4100000, growth: -2.8, accent: '#ec6b9a' },
    { name: 'Hyderabad', revenue: 2600000, growth: 4.6, accent: '#f59e0b' },
  ];
  readonly segments = [
    'Price Sensitive',
    'Premium Buyers',
    'Brand Loyal',
    'Promotion Seekers',
    'Occasional Buyers',
    'Frequent Buyers',
  ];
  readonly title = this.kind.charAt(0).toUpperCase() + this.kind.slice(1);
  readonly subtitle = `Explore the ${this.kind} dimensions behind the retail simulation model.`;
  select(id: string): void {
    this.data.selectProduct(id);
    this.engine.syncProduct();
  }
  money(value: number): string {
    return value >= 1e6
      ? `INR ${(value / 1e6).toFixed(1)}M`
      : `INR ${Math.round(value).toLocaleString('en-IN')}`;
  }
  signed(value: number): string {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  }
}
