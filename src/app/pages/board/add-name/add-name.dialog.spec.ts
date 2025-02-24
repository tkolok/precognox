import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameDialog } from 'src/app/pages/welcome/new-game.dialog/new-game.dialog';

describe('NewGameDialogComponent', () => {
  let component: NewGameDialog;
  let fixture: ComponentFixture<NewGameDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGameDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGameDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
