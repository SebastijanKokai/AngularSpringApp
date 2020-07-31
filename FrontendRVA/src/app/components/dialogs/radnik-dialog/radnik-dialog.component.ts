import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Radnik } from 'src/app/models/radnik';
import { RadnikService } from 'src/app/services/radnik.service';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Sektor } from 'src/app/models/sektor';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { SektorService } from 'src/app/services/sektor.service';

@Component({
  selector: 'app-radnik-dialog',
  templateUrl: './radnik-dialog.component.html',
  styleUrls: ['./radnik-dialog.component.css']
})
export class RadnikDialogComponent implements OnInit {

  obrazovanja: Obrazovanje[];
  sektori: Sektor[];
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RadnikDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Radnik,
              public radnikService: RadnikService,
              public obrazovanjeService: ObrazovanjeService,
              public sektorService: SektorService
  ) { }

  ngOnInit() {
    this.obrazovanjeService.getAllObrazovanje().subscribe(obrazovanja =>
      this.obrazovanja = obrazovanja
    );
    this.sektorService.getAllSektor().subscribe(sektori =>
      this.sektori = sektori
    );
  }
  compareTo(a, b) {
    return a.id == b.id;
  }

  public add(): void {
    this.data.id = -1;
    this.radnikService.addRadnik(this.data);
    this.snackBar.open('Uspešno dodat radnik', 'U redu', { duration: 1500 });
  }

  public update(): void {
    this.radnikService.updateRadnik(this.data);
    this.snackBar.open('Uspešno modifikovan radnik', 'U redu', { duration: 1500 });
  }

  public delete(): void {
    this.radnikService.deleteRadnik(this.data.id);
    this.snackBar.open('Uspešno obrisan radnik', 'U redu', { duration: 1500 });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', { duration: 500 });
  }
}
