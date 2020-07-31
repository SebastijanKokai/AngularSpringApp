import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { PreduzeceDialogComponent } from '../preduzece-dialog/preduzece-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Obrazovanje } from 'src/app/models/obrazovanje';

@Component({
  selector: 'app-obrazovanje-dialog',
  templateUrl: './obrazovanje-dialog.component.html',
  styleUrls: ['./obrazovanje-dialog.component.css']
})
export class ObrazovanjeDialogComponent implements OnInit {

  public flag: number;

   constructor(public obrazovanjeService: ObrazovanjeService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ObrazovanjeDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Obrazovanje) { }

  ngOnInit(): void {
  }

  // U slucaju potvrdi
  public add(): void {
    this.obrazovanjeService.addObrazovanje(this.data);
    this.snackBar.open('Dodato je obrazovanje: ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public update(): void {
    this.obrazovanjeService.updateObrazovanje(this.data);
    this.snackBar.open('Modifikovano je obrazovanje: ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public delete(): void {
    this.obrazovanjeService.deleteObrazovanje(this.data.id);
    this.snackBar.open('Obrisano je obrazovanje: ' + this.data.naziv, 'U redu', {
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
