import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSensordataDialogComponent } from './add-sensordata-dialog.component';

describe('AddSensordataDialogComponent', () => {
  let component: AddSensordataDialogComponent;
  let fixture: ComponentFixture<AddSensordataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSensordataDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSensordataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
