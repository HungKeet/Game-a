import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { DetailsComponent } from './components/details/details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'search/:game-search',
    component: Home,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
];
