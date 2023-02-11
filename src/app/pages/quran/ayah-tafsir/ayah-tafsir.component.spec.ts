import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyahTafsirComponent } from './ayah-tafsir.component';

describe('AyahTafsirComponent', () => {
  let component: AyahTafsirComponent;
  let fixture: ComponentFixture<AyahTafsirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AyahTafsirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AyahTafsirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
