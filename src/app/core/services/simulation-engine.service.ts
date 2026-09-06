import { Injectable, computed, inject, signal } from '@angular/core';
import { Product, SimulationInput, SimulationResult } from '../models/retail.models';
import { RetailDataService } from './retail-data.service';

@Injectable({ providedIn: 'root' })
export class SimulationEngineService {
  private readonly data = inject(RetailDataService);
  readonly selectedProduct = this.data.selectedProduct;
  readonly input = signal<SimulationInput>(this.baselineFor(this.selectedProduct()));
  readonly result = computed(() => this.calculate(this.input()));
  readonly baselineResult = computed(() =>
    this.calculateRaw(this.baselineFor(this.selectedProduct())),
  );
  update(partial: Partial<SimulationInput>): void {
    this.input.update((v) => ({ ...v, ...partial }));
  }
  reset(): void {
    this.input.set(this.baselineFor(this.selectedProduct()));
  }
  syncProduct(): void {
    this.input.set(this.baselineFor(this.selectedProduct()));
  }
  calculate(input: SimulationInput): SimulationResult {
    const p = this.data.products().find((x) => x.id === input.productId) ?? this.selectedProduct();
    const base = this.calculateRaw(this.baselineFor(p));
    const now = this.calculateRaw(input);
    return {
      ...now,
      revenueDelta: this.pct(now.revenue, base.revenue),
      demandDelta: this.pct(now.demand, base.demand),
      shareDelta: now.marketShare - base.marketShare,
      marginDelta: now.margin - base.margin,
    };
  }
  private calculateRaw(input: SimulationInput): SimulationResult {
    const p = this.data.products().find((x) => x.id === input.productId) ?? this.selectedProduct();
    const price = Math.pow(input.price / p.price, p.elasticity);
    const promo = 1 + (input.discount / 100) * (input.promotion === 'None' ? 0.45 : 0.85);
    const comp = Math.max(0.72, Math.min(1.2, input.competitorPrice / input.price));
    const avail = Math.max(0.35, input.stock / 100);
    const marketing = 1 + Math.min(0.25, (input.marketingSpend - p.marketingSpend) / 1000000);
    const demand = Math.round(
      Math.max(
        0,
        p.baseDemand *
          price *
          promo *
          comp *
          avail *
          marketing *
          input.seasonality *
          (0.92 + p.rating / 20),
      ),
    );
    const units = Math.round(demand * 0.88);
    const revenue = Math.round(units * input.price * (1 - input.discount / 100));
    const share = Math.min(42, 12 + (comp - 0.9) * 20 + input.stock / 18 + p.rating);
    const margin = Math.max(
      4,
      34 - input.discount * 0.65 + ((input.price - p.price) / p.price) * 12,
    );
    return {
      demand,
      units,
      revenue,
      marketShare: share,
      promotionLift: Math.max(0, (promo - 1) * 100),
      margin,
      conversion: Math.max(1.5, 7.4 * (demand / p.baseDemand) * (0.9 + input.stock / 1000)),
      revenueDelta: 0,
      demandDelta: 0,
      shareDelta: 0,
      marginDelta: 0,
      competitiveness: Math.round(Math.min(100, Math.max(0, comp * 82))),
    };
  }
  private baselineFor(p: Product): SimulationInput {
    return {
      productId: p.id,
      price: p.price,
      discount: p.discount,
      competitorPrice: p.competitorPrice,
      stock: p.stock,
      marketingSpend: p.marketingSpend,
      seasonality: 1.12,
      promotion: 'Discount',
    };
  }
  private pct(value: number, base: number): number {
    return base === 0 ? 0 : ((value - base) / base) * 100;
  }
}
