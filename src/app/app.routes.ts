import {Routes} from '@angular/router';
import {boardResolver, savedGamesResolver} from './utils/resolvers';

export const routes: Routes = [
  {
    path: 'board/:id',
    loadComponent: () => import('./pages/board/board.component'),
    resolve: {
      board: boardResolver
    }
  },
  {
    path: 'saved-games',
    loadComponent: () => import('./pages/saved-games/saved-games.component'),
    resolve: {
      games: savedGamesResolver
    }
  }
];
