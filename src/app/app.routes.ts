import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Test } from './components/test/test';
import { Library } from './components/library/library';

export const routes: Routes = [
  { path: '', title: 'Home', component: Home },
  { path: 'library', title: 'Library', component: Library },
  { path: 'test', title: 'Test', component: Test },
];
