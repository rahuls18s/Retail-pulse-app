import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: 'overview',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'simulation',
    loadComponent: () =>
      import('./features/simulation-lab/simulation-lab.component').then(
        (m) => m.SimulationLabComponent,
      ),
  },
  {
    path: 'scenarios',
    loadComponent: () =>
      import('./features/scenarios/scenarios.component').then((m) => m.ScenariosComponent),
  },
  {
    path: 'products',
    data: { kind: 'products' },
    loadComponent: () =>
      import('./features/explorer/explorer.component').then((m) => m.ExplorerComponent),
  },
  {
    path: 'consumers',
    data: { kind: 'consumers' },
    loadComponent: () =>
      import('./features/explorer/explorer.component').then((m) => m.ExplorerComponent),
  },
  {
    path: 'regions',
    data: { kind: 'regions' },
    loadComponent: () =>
      import('./features/explorer/explorer.component').then((m) => m.ExplorerComponent),
  },
  {
    path: 'competitors',
    data: { kind: 'competitors' },
    loadComponent: () =>
      import('./features/explorer/explorer.component').then((m) => m.ExplorerComponent),
  },
  {
    path: 'live',
    data: { mode: 'live' },
    loadComponent: () =>
      import('./features/operations/operations.component').then((m) => m.OperationsComponent),
  },
  {
    path: 'performance',
    data: { mode: 'performance' },
    loadComponent: () =>
      import('./features/operations/operations.component').then((m) => m.OperationsComponent),
  },
  { path: '**', redirectTo: 'overview' },
];
