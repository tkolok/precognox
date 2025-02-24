import {Component, inject, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDialogClose,
    FormsModule
  ],
  templateUrl: './new-game.dialog.html',
  styleUrl: './new-game.dialog.scss'
})
export class NewGameDialog {
  readonly #matDialogRef = inject(MatDialogRef);

  protected readonly size = signal<number>(3);

  start() {
    const size = this.size();

    if (2 < size && size < 8) {
      this.#matDialogRef.close(size);
    }
  }
}
