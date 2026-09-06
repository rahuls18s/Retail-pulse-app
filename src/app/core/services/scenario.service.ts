import { Injectable, signal } from '@angular/core';
import { Scenario } from '../models/retail.models';

@Injectable({ providedIn: 'root' })
export class ScenarioService {
  readonly scenarios = signal<Scenario[]>([]);
  add(scenario: Scenario): void {
    this.scenarios.update((items) => [...items.slice(-3), scenario]);
  }
  remove(id: string): void {
    this.scenarios.update((items) => items.filter((item) => item.id !== id));
  }
}
