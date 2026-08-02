import { Routes } from '@angular/router';
import { Test } from './components/test/test';
import { Library } from './components/library/library';
import { MainLayoutComponent } from './components/main-layout-component/main-layout-component';

export const routes: Routes = [
  { path: '', title: 'MainLayoutComponent', component: MainLayoutComponent },
  { path: 'library', title: 'Library', component: Library },
  { path: 'test', title: 'Test', component: Test },
];
