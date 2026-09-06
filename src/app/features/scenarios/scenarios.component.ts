import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RetailDataService } from '../../core/services/retail-data.service';
import { ScenarioService } from '../../core/services/scenario.service';
import { SimulationEngineService } from '../../core/services/simulation-engine.service';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-scenarios',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './scenarios.component.html',
})
export class ScenariosComponent {
  readonly data = inject(RetailDataService);
  readonly engine = inject(SimulationEngineService);
  readonly scenarioStore = inject(ScenarioService);
  readonly product = this.data.selectedProduct;
  readonly name = signal('');
  readonly scenarios = this.scenarioStore.scenarios;
  add(): void {
    const tones: ('blue' | 'purple' | 'orange')[] = ['blue', 'purple', 'orange'];
    this.scenarioStore.add({
      id: crypto.randomUUID(),
      name: this.name().trim() || `Scenario ${this.scenarios().length + 1}`,
      input: { ...this.engine.input() },
      result: { ...this.engine.result() },
      tone: tones[this.scenarios().length % 3],
    });
    this.name.set('');
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
