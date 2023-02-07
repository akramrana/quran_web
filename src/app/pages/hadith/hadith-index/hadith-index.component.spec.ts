import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HadithIndexComponent } from './hadith-index.component';

describe('HadithIndexComponent', () => {
  let component: HadithIndexComponent;
  let fixture: ComponentFixture<HadithIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HadithIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
