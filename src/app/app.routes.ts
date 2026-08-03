import { Routes } from '@angular/router';
import { Test } from './components/test/test';
import { Backlog } from './components/backlog/backlog';
import { MainLayoutComponent } from './components/main-layout-component/main-layout-component';

export const routes: Routes = [
  { path: '', title: 'MainLayoutComponent', component: MainLayoutComponent },
  { path: 'backlog', title: 'Backlog', component: Backlog },
  { path: 'test', title: 'Test', component: Test },
];
