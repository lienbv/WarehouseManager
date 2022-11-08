import {Component, Inject, OnInit} from '@angular/core';
import {IProduct} from "../../interface-entity/IProduct";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../service/cart.service";
import {AlertService} from "../../alert.service";
import {LoginService} from "../../service/login.service";
import {ICategories} from "../../interface-entity/ICategories";
import {RegistrationComponent} from "../registration/registration.component";
import {CustomerService} from "../../service/customer.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";
import {OrderService} from "../../service/order.service";
import {IAccount} from "../../interface-entity/IAccount";
function checkAddress(form:AbstractControl):ValidationErrors|null {
  const address = form.value;
  if (address === "Trống"){
    return {checkAddress: true}
  }
  return null

}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  listCart: any = "";
  toltal: number = 0;
  createPayment!: FormGroup;
  addressCus: any;
  ordersId!: number;
  orderProduct: any;
  quantity: number = 0;
  check: boolean = true;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private productService: ProductService, private loginService: LoginService, private customerService: CustomerService,
              private cartService: CartService, private alertService: AlertService,
              private route: ActivatedRoute, private dialog: MatDialog,
              private spinner: NgxSpinnerService, private orderService: OrderService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.createPayment = new FormGroup({
      ordersId: new FormControl(""),
      idProduct: new FormControl(""),
      account: new FormControl(""),
      userName: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required,checkAddress]),
      phone: new FormControl("", [Validators.required, Validators.pattern('^(\\d{10,12})$')]),
      total: new FormControl("", [Validators.required]),
      quantity: new FormControl("")
    });
    this.createPayment.patchValue({
      account: this.loginService.getUserName(),
      total: this.getTotal(),
      address: this.data.customers.address,
      phone: this.data.customers.phone
    })
  }
  getAddress(){
    const account1 = this.loginService.getUserName();
    this.customerService.getAccount(account1).subscribe((data)=>{
      this.addressCus = data.customers.address;
    })
    return this.addressCus;
  }
  getQuantity(){
    this.listCart = this.cartService.getListGioHang();
    for (let i = 0; i < this.listCart.length; i++) {
      this.quantity = this.listCart[i].soLuong;
    }
    return this.quantity;
  }
  getTotal() {
    this.listCart = this.cartService.getListGioHang();
    for (let i = 0; i < this.listCart.length; i++) {
      this.toltal += this.listCart[i].gia * this.listCart[i].productQuantity;
    }
    return this.toltal;
  }

  create() {
    const value = this.createPayment.value;

    if (value.account == ""){
      this.alertService.showAlertError("Bạn phải đăng nhập để đặt hàng");
      this.router.navigate(['/login']);
    }
    if (this.createPayment.valid) {
      this.ordersId = Math.floor(Math.random() * 10000);
      var listProduct = this.cartService.getListGioHang();
      this.orderProduct = {
        ordersId: this.ordersId,
        idProduct: listProduct,
        account: value.account,
        userName: value.userName,
        address: value.address,
        phone: value.phone,
        total: value.total,
        quantity: listProduct,
      }
      console.log(this.orderProduct);
      this.orderService.setOrder(this.orderProduct).subscribe((data) => {
        this.cartService.xoaHet();
        this.alertService.showAlertSuccess("Đăng kí mua hàng thành công");
        this.hidenSpinner("sp3");
      })
    }
  }
  hidenSpinner(name:string){
    this.spinner.hide(name)
  }
  showSpinner(name: string) {
    this.spinner.show(name);
  }
}
