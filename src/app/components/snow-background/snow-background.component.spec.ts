import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnowBackgroundComponent } from './snow-background.component';

describe('SnowBackgroundComponent', () => {
  let component: SnowBackgroundComponent;
  let fixture: ComponentFixture<SnowBackgroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnowBackgroundComponent],
    });

    fixture = TestBed.createComponent(SnowBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
