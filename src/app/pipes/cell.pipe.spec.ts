import {CellPipe} from 'src/app/pipes/cell-formatter.pipe';

describe('CellPipe', () => {
  it('create an instance', () => {
    const pipe = new CellPipe();
    expect(pipe).toBeTruthy();
  });
});
