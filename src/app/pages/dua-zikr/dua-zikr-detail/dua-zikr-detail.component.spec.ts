import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuaZikrDetailComponent } from './dua-zikr-detail.component';

describe('DuaZikrDetailComponent', () => {
  let component: DuaZikrDetailComponent;
  let fixture: ComponentFixture<DuaZikrDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuaZikrDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuaZikrDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
