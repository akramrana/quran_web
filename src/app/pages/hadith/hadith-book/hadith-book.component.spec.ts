import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HadithBookComponent } from './hadith-book.component';

describe('HadithBookComponent', () => {
  let component: HadithBookComponent;
  let fixture: ComponentFixture<HadithBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HadithBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
