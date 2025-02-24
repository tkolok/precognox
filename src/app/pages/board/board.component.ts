import {HttpClient} from '@angular/common/http';
import {afterNextRender, Component, computed, inject, signal} from '@angular/core';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {BoardDTO} from '../../../types/board';
import {Cell, Player} from '../../../types/cell';
import {CellPipe} from '../../pipes/cell.pipe';
import {initialSignal} from '../../utils/signals';
import {AddNameDialog} from './add-name/add-name.dialog';
import {EndGameDialog} from './end-game/end-game.dialog';

@Component({
  standalone: true,
  imports: [
    CellPipe,
    MatButton,
    MatMiniFabButton
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export default class BoardComponent {
  readonly #dialog = inject(MatDialog);
  readonly #httpClient = inject(HttpClient);
  readonly #router = inject(Router);

  protected readonly game = initialSignal<BoardDTO>('board');
  protected readonly currentPlayer = signal<Player>('1');
  protected readonly savable = signal<boolean>(false);
  protected readonly size = computed(() => Math.floor(Math.sqrt(this.game()?.board.length ?? 9)));
  protected winner: Cell = '0';

  constructor() {
    afterNextRender(() => {
      const {board} = this.game();
      const player1Moves = (/1/.exec(board) ?? []).length;
      const player2Moves = (/2/.exec(board) ?? []).length;

      this.currentPlayer.set(player1Moves > player2Moves ? '2' : '1');
      this.savable.set(/[12]/.test(board));
    });
  }

  async move(index: number) {
    const {board} = this.game();

    if (board[index] === '0') {
      const current = [...board];
      let dialog: MatDialogRef<EndGameDialog> | null = null;

      current.splice(index, 1, this.currentPlayer());
      this.game().board = current.join('');

      this.#checkWinner();
      if (this.winner !== '0') {
        dialog = this.#dialog.open(EndGameDialog, {data: this.winner});
      } else if (!board.includes('0')) {
        dialog = this.#dialog.open(EndGameDialog, {data: '0'});
      }

      if (dialog) {
        const result = await firstValueFrom(dialog.afterClosed());
        this.savable.set(false);

        if (result) {
          this.#router.navigateByUrl('/board/new', {onSameUrlNavigation: 'reload'});
        }
      } else {
        this.currentPlayer.update(current => current === '1' ? '2' : '1');
        this.savable.set(true);
      }
    }
  }

  async save() {
    const board = this.game();

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
    if (this.winner === '0') {
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

      this.winner = first;
    }
  }

  #checkWinner() {
    const board: Cell[][] = [];
    const size = this.size();

    for (let i = 0; i < size; i++) {
      const from = i * size;
      board.push([...this.game().board.slice(from, from + size)] as Cell[]);
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
