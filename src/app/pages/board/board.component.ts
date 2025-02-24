import {HttpClient} from '@angular/common/http';
import {afterNextRender, Component, computed, inject, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {firstValueFrom} from 'rxjs';
import {initialSignal} from '../../utils/signals';
import {AddNameDialog} from './add-name/add-name.dialog';

const cells = ['-', 'O', 'X'];

@Component({
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export default class BoardComponent {
  readonly #dialog = inject(MatDialog);
  readonly #httpClient = inject(HttpClient);

  protected readonly board = initialSignal<BoardDTO>('board');
  protected readonly savable = signal<boolean>(false);
  protected readonly size = computed(() => Math.floor(Math.sqrt(this.board()?.board.length ?? 9)));

  constructor() {
    afterNextRender(() => {
      this.savable.set(/[12]/.test(this.board().board));
    });
  }

  getValue(cell: string) {
    return cells[+cell];
  }

  move(index: number) {
    const board = this.board();

    if (board.board[index] === '0') {
      const current = [...board.board];

      current.splice(index, 1, '1');
      board.board = current.join('');
      this.savable.set(true);
    }
  }

  async save() {
    const board = this.board();

    if (board.id === undefined) {
      const dialogRef = this.#dialog.open(AddNameDialog);

      dialogRef.afterClosed().subscribe(async name => {
        if (name) {
          const body = {
            board: board.board,
            name
          };

          try {
            const response = (await firstValueFrom(this.#httpClient.post('http://localhost:5000/boards', body))) as BoardDTO;
            board.id = response.id;
          } catch (e) {
            console.error(e);
          }
        }
      });
    } else {
      const body = {
        board: board.board,
        name: board.name
      };

      this.#httpClient.patch(`/boards/${board.id}`, body);
    }
  }
}

export type BoardDTO = {
  board: string;
  id?: number;
  name: string;
}

