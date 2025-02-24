import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EndGameDialog} from 'src/app/pages/board/end-game/end-game.dialog';

describe('EndGameComponent', () => {
  let component: EndGameDialog;
  let fixture: ComponentFixture<EndGameDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndGameDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EndGameDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
