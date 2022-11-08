import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {ICustomer} from "../../interface-entity/ICustomer";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DetailCustomerComponent} from "../detail-customer/detail-customer.component";
import {EditCustomerComponent} from "../edit-customer/edit-customer.component";
import {DeleteCustomerComponent} from "../delete-customer/delete-customer.component";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  listCustomer: ICustomer[] = [];
  indexPagination: number = 1;
  totalPagination: number = 0;
  searchCustomer!: FormGroup;
  constructor(private customerService:CustomerService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCustomer();
    this.searchCustomer = new FormGroup({
      key: new FormControl('')
    })
  }
  getAllCustomer(){
    this.customerService.getAllCustomer().subscribe(data=>{
      // @ts-ignore
      this.listCustomer = data.content;
      console.log(this.listCustomer);
      this.totalPagination = data.totalPages;
    })
  }
  openDialogDetail(id: string) {
  this.customerService.getCustomerById(id).subscribe((data)=>{
    const dialog = this.dialog.open(DetailCustomerComponent,{
      width: '500px',
      data: data,
      disableClose: true,
      autoFocus: false
    })
    dialog.afterClosed().subscribe(result => {

      this.ngOnInit();
    });
  })
  }

  openDialogEdit(id: string) {
    this.customerService.getCustomerById(id).subscribe((data)=>{
      const dialog = this.dialog.open(EditCustomerComponent,{
        width: '1000px',
        data: data,
        disableClose: true,
        autoFocus: false
      })
      dialog.afterClosed().subscribe(result => {

        this.ngOnInit();
      });
    })
  }

  openDialogDelete(id: string) {
    this.customerService.getCustomerById(id).subscribe((data)=>{
      const dialog = this.dialog.open(DeleteCustomerComponent,{
        width: '500px',
        data: data,
        disableClose: true,
        autoFocus: false
      })
      dialog.afterClosed().subscribe(result => {

        this.ngOnInit();
      });
    })
  }

  getPage(number: number) {
  this.customerService.searchPageCustomer(number,this.searchCustomer.value.key).subscribe(data=>{
    this.listCustomer = data.content;
    this.indexPagination = data.pageable.pageNumber + 1;
  })
  }

  search() {
  this.customerService.searchPageCustomer(0,this.searchCustomer.value.key).subscribe(data=>{
    this.listCustomer = data.content;
  })
  }

  seacrhEnter($event: KeyboardEvent) {

    this.customerService.searchPageCustomer(0,this.searchCustomer.value.key).subscribe(data=>{
      this.listCustomer = data.content;
    })
  }
}
