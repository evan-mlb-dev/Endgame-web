import { Routes } from '@angular/router';
import { Backlog } from './components/backlog/backlog';
import { MainLayoutComponent } from './components/main-layout-component/main-layout-component';
import { Test } from './components/test/test';

export const routes: Routes = [
  { path: '', title: 'Endgame', component: MainLayoutComponent },
  { path: 'backlog', title: 'Endgame - Backlog', component: Backlog },
  { path: 'test', title: 'Test', component: Test },
];
