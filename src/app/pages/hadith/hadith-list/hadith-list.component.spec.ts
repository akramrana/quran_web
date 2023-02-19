import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HadithListComponent } from './hadith-list.component';

describe('HadithListComponent', () => {
  let component: HadithListComponent;
  let fixture: ComponentFixture<HadithListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HadithListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
