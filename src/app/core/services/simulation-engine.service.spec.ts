import { TestBed } from '@angular/core/testing';
import { SimulationEngineService } from './simulation-engine.service';
describe('SimulationEngineService', () => {
  it('calculates positive baseline metrics', () => {
    const engine = TestBed.inject(SimulationEngineService);
    const result = engine.result();
    expect(result.demand).toBeGreaterThan(0);
    expect(result.revenue).toBeGreaterThan(0);
  });
  it('reacts to promotion changes', () => {
    const engine = TestBed.inject(SimulationEngineService);
    const baseline = engine.result().revenue;
    engine.update({ discount: 25, promotion: 'Flash Sale' });
    expect(engine.result().revenue).not.toBe(baseline);
    expect(engine.result().promotionLift).toBeGreaterThan(0);
  });
});
