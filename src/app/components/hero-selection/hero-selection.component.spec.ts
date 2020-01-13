import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSelectionComponent } from './hero-selection.component';

describe('HeroSelectionComponent', () => {
  let component: HeroSelectionComponent;
  let fixture: ComponentFixture<HeroSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSelectionComponent ]
    })
    .compileComponents();
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
