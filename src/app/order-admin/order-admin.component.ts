import { Component, OnInit } from '@angular/core';
import {OrderService} from "../service/order.service";
import {OrderProduct} from "../interface-entity/OrderProduct";
import {FormControl, FormGroup} from "@angular/forms";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit {
  listOrder: OrderProduct[] = [];
  indexPagination: number = 1;
  totalPagination: number = 0;
  searchOrder!: FormGroup;
  constructor(private orderService:OrderService,private alertService:AlertService) { }

  ngOnInit(): void {
    this.orderService.getListOrderAdmin().subscribe((data)=>{
      this.listOrder = data.content;
      this.totalPagination = data.totalPages;
      console.log(this.listOrder)
    })
    this.searchOrder = new FormGroup({
      key: new FormControl('')
    })

  }

  search() {
  this.orderService.searchPageOrder(0,this.searchOrder.value.key).subscribe((data)=>{
    console.log(this.searchOrder.value.key);
    this.listOrder = data.content;
  })
  }

  // seacrhEnter($event: KeyboardEvent) {
  //   this.orderService.searchPageOrder(0,this.searchOrder.value.key).subscribe((data)=>{
  //     this.listOrder = data.content;
  //   })
  // }

  getPage(number: number) {
    this.orderService.searchPageOrder(number,this.searchOrder.value.key).subscribe((data)=>{
      this.listOrder = data.content;
      this.indexPagination = data.pageable.pageNumber + 1;
    })
  }

  changeStatus(ordersId: number) {
    this.orderService.getOrderProductByIdOrder(ordersId).subscribe((data)=>{
      this.alertService.showAlertSuccess("Duyệt thành công");
      this.ngOnInit();
    });
  }

  delete(ordersId: number) {
    this.orderService.deleteOrder(ordersId).subscribe((data)=>{
      this.alertService.showAlertSuccess("Đã xóa");
      this.ngOnInit();
    })
  }
}
