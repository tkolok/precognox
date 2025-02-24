import {Pipe, PipeTransform} from '@angular/core';

const cells: Record<string, string> = {
  0: '',
  1: 'O',
  2: 'X'
};

@Pipe({
  name: 'cellFormatter',
  standalone: true
})
export class CellPipe implements PipeTransform {
  transform(cell: string): string {
    return cells[cell];
  }
}
