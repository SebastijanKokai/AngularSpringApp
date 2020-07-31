import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Preduzece } from 'src/app/models/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-preduzece-dialog',
  templateUrl: './preduzece-dialog.component.html',
  styleUrls: ['./preduzece-dialog.component.css']
})
export class PreduzeceDialogComponent implements OnInit {

  public flag: number;

   constructor(public preduzeceService: PreduzeceService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PreduzeceDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Preduzece) { }

  ngOnInit(): void {
  }

  // U slucaju potvrdi
  public add(): void {
    this.preduzeceService.addPreduzece(this.data);
    this.snackBar.open('Dodato je preduzece: ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public update(): void {
    this.preduzeceService.updatePreduzece(this.data);
    this.snackBar.open('Modifikovano je preduzece: ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public delete(): void {
    this.preduzeceService.deletePreduzece(this.data.id);
    this.snackBar.open('Obrisano je preduzece: ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  // Button odustani

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste ', 'U redu', {
      duration: 500
    });
  }

}
