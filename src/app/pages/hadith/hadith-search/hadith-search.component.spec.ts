import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HadithSearchComponent } from './hadith-search.component';

describe('HadithSearchComponent', () => {
  let component: HadithSearchComponent;
  let fixture: ComponentFixture<HadithSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HadithSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
