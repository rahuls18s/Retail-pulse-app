export type PromotionType =
  | 'None'
  | 'Discount'
  | 'Buy 1 Get 1'
  | 'Bundle'
  | 'Coupon'
  | 'Cashback'
  | 'Flash Sale';
export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  discount: number;
  competitorPrice: number;
  stock: number;
  rating: number;
  marketingSpend: number;
  elasticity: number;
  baseDemand: number;
  color: string;
}
export interface SimulationInput {
  productId: string;
  price: number;
  discount: number;
  competitorPrice: number;
  stock: number;
  marketingSpend: number;
  seasonality: number;
  promotion: PromotionType;
}
export interface SimulationResult {
  demand: number;
  revenue: number;
  units: number;
  marketShare: number;
  promotionLift: number;
  margin: number;
  conversion: number;
  revenueDelta: number;
  demandDelta: number;
  shareDelta: number;
  marginDelta: number;
  competitiveness: number;
}
export interface Scenario {
  id: string;
  name: string;
  input: SimulationInput;
  result: SimulationResult;
  tone: 'blue' | 'purple' | 'orange';
}
export interface RetailTransaction {
  transactionId: string;
  productId: string;
  productName: string;
  category: string;
  region: string;
  customerSegment: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  revenue: number;
  timestamp: string;
}
export interface LiveEvent {
  productName: string;
  region: string;
  quantity: number;
  revenue: number;
  time: string;
}
export interface RegionMetric {
  name: string;
  revenue: number;
  growth: number;
  accent: string;
}
export interface WorkerAggregateResponse {
  revenue: number;
  units: number;
  processingMs: number;
  regions: RegionMetric[];
}
