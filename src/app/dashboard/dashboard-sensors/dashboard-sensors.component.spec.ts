import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSensorsComponent } from './dashboard-sensors.component';

describe('DashboardSensorsComponent', () => {
  let component: DashboardSensorsComponent;
  let fixture: ComponentFixture<DashboardSensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSensorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
