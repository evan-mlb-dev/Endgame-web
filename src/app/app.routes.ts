import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import {MyList} from './components/my-list/my-list';

export const routes: Routes = [
  { path: '', title: 'Home', component: Home },
  { path: 'my-list', title: 'My List', component: MyList },
];
