import { Component, OnInit, ViewChild } from '@angular/core';
import { Sektor } from 'src/app/models/sektor';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SektorService } from 'src/app/services/sektor.service';
import { MatDialog } from '@angular/material/dialog';
import { Preduzece } from 'src/app/models/preduzece';
import { SektorDialogComponent } from '../dialogs/sektor-dialog/sektor-dialog.component';

@Component({
  selector: 'app-sektor',
  templateUrl: './sektor.component.html',
  styleUrls: ['./sektor.component.css']
})
export class SektorComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'oznaka', 'preduzece', 'actions'];
  dataSource: MatTableDataSource<Sektor>;
  selektovaniSektor: Sektor;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public sektorService: SektorService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
   this.sektorService.getAllSektor().subscribe(data => {

     this.dataSource = new MatTableDataSource(data);

     // pretraga po nazivu ugnježdenog objekta
     this.dataSource.filterPredicate = (data, filter: string) => {
       const accumulator = (currentTerm, key) => {
         return key === 'preduzece' ? currentTerm + data.preduzece.naziv : currentTerm + data[key];
       };
       const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
       const transformedFilter = filter.trim().toLowerCase();
       return dataStr.indexOf(transformedFilter) !== -1;
     };

      // sortiranje po nazivu ugnježdenog objekta
     this.dataSource.sortingDataAccessor = (data, property) => {
       switch (property) {
         case 'preduzece': return data.preduzece.naziv.toLocaleLowerCase();
         default: return data[property];
       }
     };

     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   });

 }

  selectRow(row: any){
   this.selektovaniSektor = row;
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis?: string, preduzece?: Preduzece) {
    const dialogRef = this.dialog.open(SektorDialogComponent,
      {data: {id, naziv, oznaka, preduzece}}
    );

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        this.loadData();
      }
    });
  }

  applyFilter(filterValue: string){
   filterValue = filterValue.trim();
   filterValue = filterValue.toLocaleLowerCase();
   this.dataSource.filter = filterValue;
 }

}
