<<<<<<< HEAD
# Retail Pulse Lab

## Interactive Consumer Behavior & Retail Analytics Simulator

Retail Pulse Lab is an Angular 19 portfolio application that simulates how price, promotion, stock availability, competitor pricing, customer segments, and seasonality influence demand and revenue.

> This project uses synthetic retail data and a configurable simulation model for educational and portfolio demonstration purposes. It is not a commercial forecast and does not use proprietary market data.

## What is included

- Signal-driven overview dashboard with KPI cards, revenue trend, category mix, regional signals, and deterministic alerts.
- Simulation Lab with reactive controls for price, discount, competitor price, stock, marketing spend, seasonality, and promotion mechanics.
- Explainable demand model with elasticity, promotion lift, availability, competition, marketing, rating, and seasonality factors.
- Scenario save/compare flow and baseline analysis.
- Consumer segment response and competitor intelligence panels.
- RxJS live transaction stream using `interval`, `map`, `startWith`, and `shareReplay`.
- 100k synthetic transactions with filters and a virtual-scroll-ready data surface.
- Web Worker aggregation for regional revenue and units.
- Performance Lab with 10k500k dataset size controls and worker throughput metrics.

## Architecture

```text
UI controls  Angular Signals  SimulationEngineService  KPI state
                                      
                              Web Worker aggregation

Synthetic transactions  RxJS stream  live transaction view
```

Feature-based structure:

```text
src/app/
  core/                 shared application state and business logic
    models/
    services/
    workers/
  shared/ui/             reusable page header and KPI card components
  features/
    dashboard/           overview route
    simulation-lab/      reactive what-if simulator
    scenarios/           saved scenario comparison
    explorer/            products, consumers, regions, competitors
    operations/          live transactions and performance lab
  app.component.*        thin layout shell with navigation
  app.routes.ts          lazy-loaded feature routes
```

Routes are lazy-loaded with `loadComponent`, so the shell does not own feature markup. `AppComponent` only provides navigation and `router-outlet`; presentation and interaction logic live in the feature component that owns the route.

Signals own application state and derived metrics. RxJS is used for the time-based event stream. The worker keeps larger aggregation work away from the UI thread. No NgRx is used because the state is local to this experience and benefits from Angular-native derivation.

## Simulation model

```text
Demand = base demand
        price elasticity
        promotion lift
        competitive position
        availability
        marketing factor
        seasonality
        rating factor
```

The values are intentionally directional and explainable, not machine-learning forecasts.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:4200` and click **Run interactive demo**. The demo changes the default product inputs so the projected impact cards update immediately.

## Verification

```bash
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

## Future improvements

- IndexedDB persistence for scenarios and dashboard preferences.
- Dedicated transaction explorer route with richer sorting/grouping.
- Playwright end-to-end coverage and CI quality gates.
- Route-level lazy loading for each workspace module.

=======
# Retail-pulse-app
simulate how changes in product price, discounts, promotions, stock availability, competitor pricing, customer segments, and seasonality affect consumer demand, revenue, market share, and product performance.
>>>>>>> bd96a1d02ca487793bb98f93b552419bf48cc5e7
