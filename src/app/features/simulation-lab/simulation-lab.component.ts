import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RetailDataService } from '../../core/services/retail-data.service';
import { SimulationEngineService } from '../../core/services/simulation-engine.service';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-simulation-lab',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './simulation-lab.component.html',
})
export class SimulationLabComponent {
  readonly data = inject(RetailDataService);
  readonly engine = inject(SimulationEngineService);
  readonly product = this.data.selectedProduct;
  readonly result = this.engine.result;
  readonly segments = computed(() => [
    { name: 'Price Sensitive', impact: this.result().demandDelta * 1.65, color: '#f97373' },
    { name: 'Premium Buyers', impact: this.result().demandDelta * 0.42, color: '#a892ff' },
    { name: 'Brand Loyal', impact: this.result().demandDelta * 0.68, color: '#32c7b2' },
    { name: 'Promotion Seekers', impact: this.result().demandDelta * 1.2, color: '#f5b84f' },
  ]);
  update(field: string, value: string | number): void {
    const numeric = [
      'price',
      'discount',
      'competitorPrice',
      'stock',
      'marketingSpend',
      'seasonality',
    ].includes(field);
    this.engine.update({ [field]: numeric ? Number(value) : value } as never);
  }
  runDemo(): void {
    this.engine.reset();
    [{ price: 44 }, { discount: 15 }, { competitorPrice: 40 }, { stock: 85 }].forEach(
      (step, index) => setTimeout(() => this.engine.update(step), 650 * (index + 1)),
    );
  }
  signed(value: number): string {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  }
  money(value: number): string {
    return value >= 1e6
      ? `INR ${(value / 1e6).toFixed(1)}M`
      : `INR ${Math.round(value).toLocaleString('en-IN')}`;
  }
}
