import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationDetailsComponent } from './station-details.component';

describe('StationDetailsComponent', () => {
  let component: StationDetailsComponent;
  let fixture: ComponentFixture<StationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
