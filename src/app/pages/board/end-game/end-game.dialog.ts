import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import {Cell} from '../../../../types/cell';
import {CellPipe} from '../../../pipes/cell.pipe';

@Component({
  selector: 'app-end-game',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    ReactiveFormsModule,
    MatDialogClose,
    CellPipe
  ],
  templateUrl: './end-game.dialog.html',
  styleUrl: './end-game.dialog.scss'
})
export class EndGameDialog {
  readonly data = inject<Cell>(MAT_DIALOG_DATA);
}
