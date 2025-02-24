import { Routes } from '@angular/router';
import {boardResolver} from './utils/resolvers';

export const routes: Routes = [
  {
    path: 'board/:id',
    loadComponent: () => import('./pages/board/board.component'),
    resolve: {
      board: boardResolver
    }
  },
  {
    path: '',
    loadComponent: () => import('./pages/welcome/welcome.component')
  }
];
