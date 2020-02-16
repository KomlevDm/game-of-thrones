import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BackArrowComponent } from './back-arrow.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BackArrowComponent', () => {
  let component: BackArrowComponent;
  let fixture: ComponentFixture<BackArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackArrowComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
