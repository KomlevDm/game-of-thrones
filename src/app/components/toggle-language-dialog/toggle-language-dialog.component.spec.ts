import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleLanguageDialogComponent } from './toggle-language-dialog.component';

describe('ToggleLanguageDialogComponent', () => {
  let component: ToggleLanguageDialogComponent;
  let fixture: ComponentFixture<ToggleLanguageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleLanguageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleLanguageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
