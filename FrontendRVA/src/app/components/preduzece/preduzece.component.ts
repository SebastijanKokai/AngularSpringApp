import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Preduzece } from 'src/app/models/preduzece';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PreduzeceService } from 'src/app/services/preduzece.service';
import { MatDialog } from '@angular/material/dialog';
import { PreduzeceDialogComponent } from '../dialogs/preduzece-dialog/preduzece-dialog.component';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'pib', 'sediste', 'opis', 'actions'];
  dataSource: MatTableDataSource<Preduzece>;

@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
@ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private preduzeceService: PreduzeceService,
              private dialog: MatDialog) {  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.preduzeceService.getAllPreduzece().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id?: number, naziv?: string, pib?: number, sediste?: string, opis?: string) {
    const dialogRef = this.dialog.open(PreduzeceDialogComponent,
      {data: {id, naziv, pib, sediste, opis}}
    );

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        this.loadData();
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
