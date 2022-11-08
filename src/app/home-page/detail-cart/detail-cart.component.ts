import { Component, OnInit } from '@angular/core';
import {CartService} from "../../service/cart.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {IProduct} from "../../interface-entity/IProduct";
import {AlertService} from "../../alert.service";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {ICategories} from "../../interface-entity/ICategories";
import {RegistrationComponent} from "../registration/registration.component";
import {CustomerService} from "../../service/customer.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../../service/order.service";
import {DtoOrder} from "../../interface-entity/DtoOrder";
import {PaymentComponent} from "../payment/payment.component";
import {NgxSpinnerService} from "ngx-spinner";
import {DeleteAllComponent} from "../delete-all/delete-all.component";

@Component({
  selector: 'app-detail-cart',
  templateUrl: './detail-cart.component.html',
  styleUrls: ['./detail-cart.component.css']
})
export class DetailCartComponent implements OnInit {
  listCart: any = "";
  toltal: number = 0;
  totalNumber: number = 0;
  searchProduct!: FormGroup;
  listProduct: IProduct[] = [];
  username: string = '';
  orderProduct: any;
  ordersId:any;
  check:any;
  listCategories: ICategories[]=[];
  checkList: any;
  private char: any;
  constructor(private productService: ProductService,private cartService: CartService,private alertService: AlertService,
              private loginService:LoginService, private router: Router, private customerService: CustomerService,
              private dialog:MatDialog,private orderService:OrderService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.username = this.loginService.getUserName();
    this.totalNumber = this.cartService.getSoLuongGioHang();
    this.productService.getAllCategories().subscribe((data)=>{
      this.listCategories = data;
    });
    this.toltal = 0;
    this.getTotal();
    if (this.listCart.length === 0){
      this.checkList = true;
    }else {
      this.checkList = false;
    }
    this.searchProduct = new FormGroup({
      key: new FormControl('')
    })
  }
  search() {
    this.productService.key = this.searchProduct.value.key;
    this.router.navigateByUrl("/home").then();
  }
  getTotal(){
    this.listCart = this.cartService.getListGioHang();
    for (let i =0;i<this.listCart.length;i++){
      this.toltal+= this.listCart[i].gia * this.listCart[i].productQuantity;
    }
  }
  openDialogDelete(productId: any) {
    this.cartService.xoaSanPham(productId);
    this.alertService.showAlertSuccess("Xóa thành công");
    this.ngOnInit();
  }

  logOut() {
    this.loginService.removeToken();
    this.loginService.removeUserName();
    this.loginService.removeRole();
    this.cartService.xoaHet();
    this.router.navigateByUrl("/login").then();
  }
  numToString(num: number) {
    return num.toLocaleString().split(',').join(this.char || '.');
  }
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};



  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }


  beforeChange(e: any) {
    console.log('beforeChange');
  }

  openRegistration() {
    this.customerService.getAllAccount().subscribe(data => {
      const dialog = this.dialog.open(RegistrationComponent, {
        width: '1000px',
        height: '100%',
        disableClose: false,
        autoFocus: false,
        data: data
      });
      dialog.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    });
  }

  searchByCategories(categoryName: any) {
    this.productService.key = categoryName;
    this.router.navigateByUrl("/home").then();
  }

  payment() {
    this.ordersId =  Math.floor(Math.random() * 10000);
    var listProduct = this.cartService.getListGioHang();
    console.log(this.listCart);
    // for (let i =0;i<this.listCart.length;i++){
    //   var productId = this.listCart[i].masp;
    // }
    let account = this.loginService.getUserName();

    this.orderProduct = {
      ordersId:this.ordersId,
      idProduct: listProduct,
      account: account,
    }
    console.log(this.orderProduct)
    this.orderService.setOrder(this.orderProduct).subscribe((data)=>{
      this.listCart = data;
    })
  }

  OpenPayment() {
    if (this.listCart.length === 0){
      this.alertService.showAlertError("Bạn chưa mua hàng để thanh toán");
    }else {
      let account = this.loginService.getUserName();
      this.customerService.getAccount(account).subscribe(data => {
      const dialog = this.dialog.open(PaymentComponent, {
        width: '1000px',
        height: '100%',
        disableClose: false,
        autoFocus: false,
        data: data
      });
      dialog.afterClosed().subscribe(result => {
        this.router.navigateByUrl('/detail-cart');
        this.ngOnInit();
      })
    });
    }
  }

  deleteAll() {
    const dialog = this.dialog.open(DeleteAllComponent, {
      width: '500px',
      disableClose: false,
      autoFocus: false,
    });
    dialog.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }
}
