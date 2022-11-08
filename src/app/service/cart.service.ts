import { Injectable } from '@angular/core';
import {IProduct} from "../interface-entity/IProduct";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  key: any;
  constructor() { }
  getListGioHang(){
    // @ts-ignore
    return JSON.parse(localStorage.getItem("cart"));
  }
  setListGioHang(list: any){
    localStorage.setItem('cart',JSON.stringify(list));
  }

  addToGioHang(masp: string, productName: String, price: number,quantity:number){
    var currentList = this.getListGioHang();
    if (!currentList){
      currentList= [];
    }
    var daCo =false;
    var quantitytest = 1;
    for (var sp of currentList){
      if (sp.productId == masp){
        sp.productQuantity+= quantity;
        daCo = true;
      }
    }
    if(!daCo) {
      currentList.push({
        productId: masp,
        productQuantity: quantity,
        tensp: productName,
        gia: price
      })
    }
    this.setListGioHang(currentList);
  }
  xoaSanPham(masp: number){
    var currentList = this.getListGioHang();
    for (var i =0;i<currentList.length;i++){
      if (currentList[i].productId == masp){
        currentList.splice(i,1);
        break;
      }
    }
    this.capNhatMoiThu(currentList);
  };
  capNhatMoiThu(list: any){
    this.setListGioHang(list);
    this.getListGioHang();
  }
  xoaHet(){
    var currentList = this.getListGioHang();
    currentList = [];
    this.capNhatMoiThu(currentList);
  }
  getSoLuongGioHang():number {
    var currentList = this.getListGioHang();

    var productQuantity = 0;
    if(currentList != null) {
      for(var sp of currentList) {
        productQuantity += sp.productQuantity;
      }
    }

    return productQuantity;
  }
}
