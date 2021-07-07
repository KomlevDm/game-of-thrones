import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GameDialogComponent } from './game-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('GameDialogComponent', () => {
  let component: GameDialogComponent;
  let fixture: ComponentFixture<GameDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GameDialogComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
