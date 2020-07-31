import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { Radnik } from 'src/app/models/radnik';
import { MatTableDataSource } from '@angular/material/table';
import { Sektor } from 'src/app/models/sektor';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RadnikService } from 'src/app/services/radnik.service';
import { MatDialog } from '@angular/material/dialog';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { RadnikDialogComponent } from '../dialogs/radnik-dialog/radnik-dialog.component';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit, OnChanges {

  displayedColumns = ['id', 'ime', 'prezime', 'brojLk', 'obrazovanje', 'sektor', 'actions'];
  dataSource: MatTableDataSource<Radnik>;

  @Input() selektovaniSektor: Sektor;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public radnikService: RadnikService,
              public dialog: MatDialog) { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.selektovaniSektor.id) {
      debugger;
      this.loadData();
    }
  }

  public loadData() {

    this.radnikService.getRadniks(this.selektovaniSektor.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        //pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'sektor' ? currentTerm + data.sektor.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        //sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'sektor': return data.sektor.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        //pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'obrazovanje' ? currentTerm + data.obrazovanje.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        //sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'obrazovanje': return data.obrazovanje.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    console.log('end');
  }

  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojLk?: number, obrazovanje?: Obrazovanje, sektor?: Sektor) {
    const dialogRef = this.dialog.open(RadnikDialogComponent,
      {data: {id, ime, prezime, brojLk, obrazovanje, sektor}}
    );

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        this.loadData();
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
