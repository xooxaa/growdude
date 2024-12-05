import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { SnackbarService } from '../../services/snackbar.service';
import { StationsService } from '../../services/stations.service';
import { StationCreate } from '../../models/station-create.model';

@Component({
  selector: 'app-new-station',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './new-station.component.html',
  styleUrl: './new-station.component.css',
})
export class NewStationComponent {
  stationsService = inject(StationsService);
  snackbar = inject(SnackbarService);
  router = inject(Router);

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    name: [''],
    description: [''],
    longitude: [7.6091],
    latitude: [51.9636],
  });

  async onCreateNewStation() {
    const { name, description, longitude, latitude } = this.form.value;

    if (!name) {
      this.snackbar.openSnackBar('Die Station muss einen Namen haben');
      return;
    }

    try {
      await this.stationsService.createNewStation({
        name,
        description,
        longitude,
        latitude,
      } as StationCreate);
      await this.router.navigate(['/dashboard']);
    } catch {
      this.snackbar.openSnackBar('Die Station konnte nicht angelegt werden');
    }
  }
}
