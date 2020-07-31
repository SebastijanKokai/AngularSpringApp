import { Component, OnInit, Inject } from '@angular/core';
import { Preduzece } from 'src/app/models/preduzece';
import { SektorService } from 'src/app/services/sektor.service';
import { PreduzeceService } from 'src/app/services/preduzece.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sektor } from 'src/app/models/sektor';

@Component({
  selector: 'app-sektor-dialog',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css']
})
export class SektorDialogComponent implements OnInit {
  preduzeca: Preduzece[];
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SektorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sektor,
              public sektorService: SektorService,
              public preduzeceService: PreduzeceService
  ) { }

  ngOnInit() {
    this.preduzeceService.getAllPreduzece().subscribe(preduzeca =>
      this.preduzeca = preduzeca
    );
  }
  compareTo(a, b) {
    return a.id == b.id;
  }

  public add(): void {
    this.data.id = -1;
    this.sektorService.addSektor(this.data);
    this.snackBar.open('Uspešno dodat sektor', 'U redu', { duration: 1500 });
  }

  public update(): void {
    this.sektorService.updateSektor(this.data);
    this.snackBar.open('Uspešno modifikovan sektor', 'U redu', { duration: 1500 });
  }

  public delete(): void {
    this.sektorService.deleteSektor(this.data.id);
    this.snackBar.open('Uspešno obrisan sektor', 'U redu', { duration: 1500 });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', { duration: 500 });
  }
}
