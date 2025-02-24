import {Component, computed, model} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {RouterLink} from '@angular/router';
import {BoardDTO} from '../../../types/board';
import {initialSignal} from '../../utils/signals';

@Component({
  selector: 'app-saved-games',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButton,
    MatAnchor,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput
  ],
  templateUrl: './saved-games.component.html',
  styleUrl: './saved-games.component.scss'
})
export default class SavedGamesComponent {
  protected readonly allGames = initialSignal<BoardDTO[]>('games');
  readonly filter = model<string>('');
  protected readonly filteredGames = computed<BoardDTO[]>(() => this.#computeFilteredGames());

  #computeFilteredGames() {
    const regex = new RegExp(this.filter().trim(), 'i');

    return this.allGames().filter(game => regex.test(game.name));
  }
}
