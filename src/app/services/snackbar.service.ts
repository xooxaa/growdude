import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, duration?: number) {
    this._snackBar.open(message, 'OK', {
      duration: duration ? duration : 4000,
    });
  }
}
