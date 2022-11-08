import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IProduct} from "../../interface-entity/IProduct";
import {ProductService} from "../../service/product.service";
import {CartService} from "../../service/cart.service";
import {AlertService} from "../../alert.service";
import {LoginService} from "../../service/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {ICategories} from "../../interface-entity/ICategories";
import {RegistrationComponent} from "../registration/registration.component";
import {MatDialog} from "@angular/material/dialog";
import {DtoCustomer} from "../../interface-entity/DtoCustomer";
import {OrderService} from "../../service/order.service";
import {ListOrderComponent} from "../list-order/list-order.component";
import {EditCustomerComponent} from "../../customer/edit-customer/edit-customer.component";
import {ChangePassComponent} from "../change-pass/change-pass.component";


@Component({
  selector: 'app-detail-users',
  templateUrl: './detail-users.component.html',
  styleUrls: ['./detail-users.component.css']
})
export class DetailUsersComponent implements OnInit {
  totalNumber: number = 0;
  searchProduct!: FormGroup;
  customer: any;
  username: string = '';
  listCategories: ICategories[] = [];
  updateCustomer!: FormGroup;
  id!: any;
  idCustomerChangePass: any;
  customerEdit!: DtoCustomer;
  key:any;
  constructor(private productService: ProductService, private customerService: CustomerService, private cartService: CartService, private alertService: AlertService,
              private loginService: LoginService, private router: Router, private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private ordersService:OrderService) {
  }

  ngOnInit(): void {
    this.key = this.cartService.key;
    this.updateCustomer = new FormGroup({
      idCustomer: new FormControl("", [Validators.required]),
      nameCustomer: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required, Validators.pattern('^(\\d{10,12})$')]),
      email: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z_.0-9]+@+[a-z]+.[a-z]+.[a-z]+/)]),
      idCard: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      account: new FormControl("", [Validators.required]),
      passwork: new FormControl("", [Validators.required]),
    });
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      console.log(this.id);
      this.customerService.getAccount(this.id).subscribe((data) => {
        this.updateCustomer.patchValue({
          idCustomer: data.customers.idCustomer,
          nameCustomer: data.customers.nameCustomer,
          phone: data.customers.phone,
          email: data.customers.email,
          idCard: data.customers.idCard,
          address: data.customers.address,
          account: data.account,
          passwork: data.password
        })
      })
      console.log(this.updateCustomer.value)
    });

    this.username = this.loginService.getUserName();
    this.totalNumber = this.cartService.getSoLuongGioHang();
    this.productService.getAllCategories().subscribe((data) => {
      this.listCategories = data;
    })
    this.searchProduct = new FormGroup({
      key: new FormControl('')
    })
    this.customerService.getCustomerByAccount(this.username).subscribe((data) => {
      console.log(this.username);
      this.customer = data;
      console.log(this.customer);
    })

  }

  search() {
    this.productService.key = this.searchProduct.value.key;
    this.router.navigateByUrl("/home").then();
  }

  logOut() {
    this.loginService.removeToken();
    this.loginService.removeUserName();
    this.loginService.removeRole();
    this.cartService.xoaHet();
    this.router.navigateByUrl("/login").then();
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

  create() {
  if (this.updateCustomer.valid){
    const value = this.updateCustomer.value;
    this.customerEdit = new DtoCustomer(value.idCustomer,value.nameCustomer,value.phone,
      value.email,value.idCard,value.address,value.account,value.passwork);
    this.customerService.updateCustomer(this.customerEdit).subscribe((data)=>{
      this.alertService.showAlertSuccess("Sửa thông tin thành công");
    })
  }
  }

  openListOrder(username: string) {
      const dialog = this.dialog.open(ListOrderComponent, {
        width: '1100px',
        height: '100%',
        disableClose: false,
        autoFocus: false,
      });
      dialog.afterClosed().subscribe(result => {
        this.ngOnInit();
      })

  }

  OpenChangePass() {
    const dialog = this.dialog.open(ChangePassComponent, {
      width: '1000px',
      height: '100%',
      disableClose: false,
      autoFocus: false,
    });
    dialog.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
