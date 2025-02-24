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
  protected readonly currentPlayer = signal<Player>('1');
  protected readonly savable = signal<boolean>(false);
  protected readonly size = computed(() => Math.floor(Math.sqrt(this.board()?.board.length ?? 9)));
  protected readonly winner = signal<Cell>('0');

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

      current.splice(index, 1, this.currentPlayer());
      board.board = current.join('');

      this.#checkWinner();

      if (!board.board.includes('0')) {
        console.log('end');
      }

      this.currentPlayer.update(current => current === '1' ? '2' : '1');
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

  #checkRow(board: Cell[][], fromX: number, fromY: number, incX: number, incY: number) {
    if (this.winner() === '0') {
      const first = board[fromY][fromX];

      if (first === '0') {
        return;
      }

      const size = this.size();
      for (let x = fromX, y = fromY; x < size && y < size; x += incX, y += incY) {
        if (board[y][x] !== first) {
          return;
        }
      }

      this.winner.set(first);
    }
  }

  #checkWinner() {
    const board: Cell[][] = [];
    const size = this.size();

    for (let i = 0; i < size; i++) {
      const from = i * size;
      board.push([...this.board().board.slice(from, from + size)] as Cell[]);
    }

    // horizontal
    for (let y = 0; y < size; y++) {
      this.#checkRow(board, 0, y, 1, 0);
    }

    // vertical
    for (let x = 0; x < size; x++) {
      this.#checkRow(board, x, 0, 0, 1);
    }

    // diagonal
    this.#checkRow(board, 0, 0, 1, 1);
    this.#checkRow(board, 0, size - 1, 1, -1);
  }
}

export type BoardDTO = {
  board: string;
  id?: number;
  name: string;
}
type Cell = '0' | Player;
type Player = '1' | '2';
