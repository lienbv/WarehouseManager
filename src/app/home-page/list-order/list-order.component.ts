import {Component, Inject, OnInit} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IAccount} from "../../interface-entity/IAccount";
import {LoginService} from "../../service/login.service";
import {OrderProduct} from "../../interface-entity/OrderProduct";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  img!:string;
  account!:string;
  listOrderProduct: OrderProduct[]=[];
  toltal: number = 0;
  check: any;
  key:any;
  private char: any;
  constructor(private orderService:OrderService,private loginService:LoginService,private cartService:CartService) { }

  ngOnInit(): void {
    this.key = 1;
    this.account = this.loginService.getUserName();
    console.log(this.account)
    this.orderService.getListOrderProduct(this.account).subscribe((data)=>{
      this.listOrderProduct = data;
      this.check = true;
      console.log("đơn mua"+ data);
    });
    this.getTotal();

  }
  numToString(num: number) {
    return num.toLocaleString().split(',').join(this.char || '.');
  }
  getTotal(){
    this.orderService.getListOrderProduct(this.account).subscribe((data)=>{
      this.listOrderProduct = data;
    for (let i = 0; i<this.listOrderProduct.length;i++){
      this.toltal += this.listOrderProduct[i].product.productPrice*this.listOrderProduct[i].quantity;
    }
    });
  }
}
