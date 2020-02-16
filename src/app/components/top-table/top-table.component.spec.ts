import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopTableComponent } from './top-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('TopTableComponent', () => {
  let component: TopTableComponent;
  let fixture: ComponentFixture<TopTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopTableComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
