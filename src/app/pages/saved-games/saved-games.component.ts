import {Component, computed, inject, model} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {RouterLink} from '@angular/router';
import {BoardDTO} from '../../../types/board';
import {CellPipe} from '../../pipes/cell.pipe';
import {AsyncClientService} from '../../services/async-client.service';
import {initialSignal} from '../../utils/signals';

@Component({
  standalone: true,
  imports: [
    CellPipe,
    FormsModule,
    MatAnchor,
    MatButton,
    MatCardModule,
    MatFormField,
    MatInput,
    MatLabel,
    RouterLink
  ],
  templateUrl: './saved-games.component.html',
  styleUrl: './saved-games.component.scss'
})
export default class SavedGamesComponent {
  readonly #asyncClientService = inject(AsyncClientService);

  protected readonly allGames = initialSignal<BoardDTO[]>('games');
  readonly filter = model<string>('');
  protected readonly filteredGames = computed<BoardDTO[]>(() => this.#computeFilteredGames());

  getSize(game: BoardDTO) {
    return Math.floor(Math.sqrt(game.board.length));
  }

  async remove(game: BoardDTO) {
    try {
      await this.#asyncClientService.removeGame(game.id!);

      const allGames = [...this.allGames()];
      const index = allGames.indexOf(game);

      allGames.splice(index, 1);
      this.allGames.set(allGames);
    } catch {
    }
  }

  #computeFilteredGames() {
    const regex = new RegExp(this.filter().trim(), 'i');

    return this.allGames().filter(game => regex.test(game.name));
  }
}
