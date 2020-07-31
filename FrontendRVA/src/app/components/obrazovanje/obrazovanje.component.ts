import { ObrazovanjeDialogComponent } from './../dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { ObrazovanjeService } from './../../services/obrazovanje.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-obrazovanje',
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css']
})
export class ObrazovanjeComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'stepenStrucneSpreme', 'opis', 'actions'];
  dataSource: MatTableDataSource<Obrazovanje>;

@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
@ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private ObrazovanjeService: ObrazovanjeService,
              private dialog: MatDialog) {  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.ObrazovanjeService.getAllObrazovanje().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id?: number, naziv?: string, stepenStrucneSpreme?: string, opis?: string) {
    const dialogRef = this.dialog.open(ObrazovanjeDialogComponent,
      {data: {id, naziv, stepenStrucneSpreme, opis}}
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
