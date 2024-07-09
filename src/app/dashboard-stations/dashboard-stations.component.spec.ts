import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStationsComponent } from './dashboard-stations.component';

describe('DashboardStationsComponent', () => {
  let component: DashboardStationsComponent;
  let fixture: ComponentFixture<DashboardStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
