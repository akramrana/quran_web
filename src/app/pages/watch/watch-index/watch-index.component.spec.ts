import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchIndexComponent } from './watch-index.component';

describe('WatchIndexComponent', () => {
  let component: WatchIndexComponent;
  let fixture: ComponentFixture<WatchIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
