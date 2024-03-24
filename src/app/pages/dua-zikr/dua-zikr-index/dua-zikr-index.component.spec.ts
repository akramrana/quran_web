import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuaZikrIndexComponent } from './dua-zikr-index.component';

describe('DuaZikrIndexComponent', () => {
  let component: DuaZikrIndexComponent;
  let fixture: ComponentFixture<DuaZikrIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuaZikrIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuaZikrIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
