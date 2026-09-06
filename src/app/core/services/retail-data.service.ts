import { Injectable, computed, signal } from '@angular/core';
import { interval, map, shareReplay, startWith } from 'rxjs';
import { LiveEvent, Product, RetailTransaction } from '../models/retail.models';

const seed: Product[] = [
  {
    id: 'cola',
    name: 'Spark Cola 500ml',
    category: 'Beverages',
    brand: 'Spark',
    price: 40,
    discount: 5,
    competitorPrice: 42,
    stock: 96,
    rating: 4.4,
    marketingSpend: 180000,
    elasticity: -1.34,
    baseDemand: 96200,
    color: '#6d5dfc',
  },
  {
    id: 'earbuds',
    name: 'Wireless Earbuds X100',
    category: 'Electronics',
    brand: 'Pulse Audio',
    price: 2499,
    discount: 10,
    competitorPrice: 2299,
    stock: 91,
    rating: 4.3,
    marketingSpend: 250000,
    elasticity: -1.08,
    baseDemand: 18400,
    color: '#15b8a6',
  },
  {
    id: 'coffee',
    name: 'Northstar Coffee 250g',
    category: 'Grocery',
    brand: 'Northstar',
    price: 320,
    discount: 8,
    competitorPrice: 299,
    stock: 88,
    rating: 4.6,
    marketingSpend: 125000,
    elasticity: -0.74,
    baseDemand: 32100,
    color: '#f59e0b',
  },
  {
    id: 'sneakers',
    name: 'Everyday Runner V2',
    category: 'Fashion',
    brand: 'Arc Athletics',
    price: 3299,
    discount: 15,
    competitorPrice: 3499,
    stock: 82,
    rating: 4.2,
    marketingSpend: 210000,
    elasticity: -1.22,
    baseDemand: 12800,
    color: '#ec6b9a',
  },
  {
    id: 'snacks',
    name: 'Masala Crunch 90g',
    category: 'Snacks',
    brand: 'Local Harvest',
    price: 55,
    discount: 10,
    competitorPrice: 50,
    stock: 94,
    rating: 4.1,
    marketingSpend: 75000,
    elasticity: -1.46,
    baseDemand: 68400,
    color: '#fb7a58',
  },
];
const regions = [
  'Chennai',
  'Bengaluru',
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Kochi',
  'Pune',
  'Kolkata',
];
const segments = [
  'Price Sensitive',
  'Premium Buyers',
  'Brand Loyal',
  'Promotion Seekers',
  'Occasional Buyers',
  'Frequent Buyers',
];

@Injectable({ providedIn: 'root' })
export class RetailDataService {
  readonly products = signal<Product[]>(seed);
  readonly selectedProductId = signal('cola');
  readonly datasetSize = signal(100000);
  readonly transactions = signal<RetailTransaction[]>(this.makeTransactions(100000));
  readonly regions = signal(regions);
  readonly segments = signal(segments);
  readonly search = signal('');
  readonly selectedProduct = computed(
    () => this.products().find((p) => p.id === this.selectedProductId()) ?? this.products()[0],
  );
  readonly liveEvents$ = interval(1800).pipe(
    startWith(0),
    map(() => this.makeEvent()),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  selectProduct(id: string): void {
    this.selectedProductId.set(id);
  }
  setDatasetSize(size: number): void {
    this.datasetSize.set(size);
    this.transactions.set(this.makeTransactions(size));
  }
  private makeEvent(): LiveEvent {
    const p = this.products()[Math.floor(Math.random() * this.products().length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    return {
      productName: p.name,
      region: regions[Math.floor(Math.random() * regions.length)],
      quantity,
      revenue: Math.round(quantity * p.price * (1 - p.discount / 100)),
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
  }
  private makeTransactions(count: number): RetailTransaction[] {
    return Array.from({ length: count }, (_, i) => {
      const p = this.products()[i % this.products().length];
      const quantity = (i % 4) + 1;
      const discount = (i * 7) % 21;
      const unitPrice = Math.round(p.price * (1 - discount / 100));
      return {
        transactionId: `TX-${String(i + 1).padStart(6, '0')}`,
        productId: p.id,
        productName: p.name,
        category: p.category,
        region: regions[i % regions.length],
        customerSegment: segments[i % segments.length],
        quantity,
        unitPrice,
        discount,
        revenue: quantity * unitPrice,
        timestamp: new Date(Date.now() - (i % 90) * 86400000 - (i % 1440) * 60000).toISOString(),
      };
    });
  }
}
