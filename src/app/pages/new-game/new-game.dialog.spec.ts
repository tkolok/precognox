import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewGameDialog} from 'src/app/pages/new-game/new-game.dialog';

describe('NewGameComponent', () => {
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
