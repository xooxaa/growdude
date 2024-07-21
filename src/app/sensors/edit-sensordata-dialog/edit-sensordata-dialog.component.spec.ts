import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSensordataDialogComponent } from './edit-sensordata-dialog.component';

describe('EditSensordataDialogComponent', () => {
  let component: EditSensordataDialogComponent;
  let fixture: ComponentFixture<EditSensordataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSensordataDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSensordataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
