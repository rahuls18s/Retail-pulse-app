import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RetailDataService } from '../../core/services/retail-data.service';
import { SimulationEngineService } from '../../core/services/simulation-engine.service';
import { KpiCardComponent } from '../../shared/ui/kpi-card/kpi-card.component';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DecimalPipe,
    RouterLink,
    PageHeaderComponent,
    KpiCardComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  readonly data = inject(RetailDataService);
  readonly engine = inject(SimulationEngineService);
  readonly region = signal('All regions');
  readonly category = signal('All categories');
  readonly categories = computed(() => [
    'All categories',
    ...new Set(this.data.products().map((product) => product.category)),
  ]);
  readonly kpis = computed(() => [
    {
      label: 'Projected revenue',
      value: this.money(this.engine.result().revenue),
      delta: this.engine.result().revenueDelta,
      tone: 'violet',
    },
    {
      label: 'Units sold',
      value: this.short(this.engine.result().units),
      delta: this.engine.result().demandDelta,
      tone: 'teal',
    },
    {
      label: 'Market share',
      value: `${this.engine.result().marketShare.toFixed(1)}%`,
      delta: this.engine.result().shareDelta,
      tone: 'amber',
    },
    {
      label: 'Demand index',
      value: this.short(this.engine.result().demand),
      delta: this.engine.result().demandDelta,
      tone: 'pink',
    },
  ]);
  readonly alerts = computed(() => {
    const result = this.engine.result();
    const input = this.engine.input();
    const items: { type: string; title: string; body: string }[] = [];
    if (result.revenueDelta < -5)
      items.push({
        type: 'risk',
        title: 'Revenue risk',
        body: `Projected revenue is down ${Math.abs(result.revenueDelta).toFixed(1)}% versus baseline.`,
      });
    if (input.stock < 60)
      items.push({
        type: 'risk',
        title: 'Stock risk',
        body: `Demand is exposed with only ${input.stock}% availability.`,
      });
    if (input.competitorPrice < input.price * 0.9)
      items.push({
        type: 'risk',
        title: 'Competitive risk',
        body: 'Your product is priced above the market average.',
      });
    if (result.revenueDelta > 3)
      items.push({
        type: 'opportunity',
        title: 'Promotion opportunity',
        body: `This mix could increase revenue by ${result.revenueDelta.toFixed(1)}%.`,
      });
    return items.length
      ? items
      : [
          {
            type: 'success',
            title: 'Balanced scenario',
            body: 'No major business risks detected in this simulation.',
          },
        ];
  });
  readonly regions = [
    { name: 'Bengaluru', revenue: 3400000, growth: 9.1, accent: '#6d5dfc' },
    { name: 'Chennai', revenue: 2800000, growth: 7.2, accent: '#15b8a6' },
    { name: 'Mumbai', revenue: 4100000, growth: -2.8, accent: '#ec6b9a' },
    { name: 'Hyderabad', revenue: 2600000, growth: 4.6, accent: '#f59e0b' },
  ];
  runDemo(): void {
    this.engine.reset();
    [{ price: 44 }, { discount: 15 }, { competitorPrice: 40 }, { stock: 85 }].forEach(
      (step, index) => setTimeout(() => this.engine.update(step), 650 * (index + 1)),
    );
  }
  money(value: number): string {
    return value >= 1e6
      ? `INR ${(value / 1e6).toFixed(1)}M`
      : `INR ${Math.round(value).toLocaleString('en-IN')}`;
  }
  short(value: number): string {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : Math.round(value).toString();
  }
  signed(value: number): string {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  }
}
