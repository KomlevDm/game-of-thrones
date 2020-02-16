import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSelectionComponent } from './hero-selection.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroSelectionComponent', () => {
  let component: HeroSelectionComponent;
  let fixture: ComponentFixture<HeroSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroSelectionComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
