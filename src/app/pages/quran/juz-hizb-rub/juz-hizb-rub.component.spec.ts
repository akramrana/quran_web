import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuzHizbRubComponent } from './juz-hizb-rub.component';

describe('JuzHizbRubComponent', () => {
  let component: JuzHizbRubComponent;
  let fixture: ComponentFixture<JuzHizbRubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuzHizbRubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuzHizbRubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
