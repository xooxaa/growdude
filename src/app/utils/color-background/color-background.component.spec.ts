import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBackgroundComponent } from './color-background.component';

describe('ColorBackgroundComponent', () => {
  let component: ColorBackgroundComponent;
  let fixture: ComponentFixture<ColorBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
