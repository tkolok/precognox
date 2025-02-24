import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {BoardDTO} from '../../../types/board';
import {initialSignal} from '../../utils/signals';

@Component({
  selector: 'app-saved-games',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './saved-games.component.html',
  styleUrl: './saved-games.component.scss'
})
export default class SavedGamesComponent {
  protected readonly games = initialSignal<BoardDTO[]>('games');
}
