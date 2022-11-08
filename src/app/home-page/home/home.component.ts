import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {IProduct} from "../../interface-entity/IProduct";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../service/cart.service";
import {AlertService} from "../../alert.service";
import {FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {RegistrationComponent} from "../registration/registration.component";
import {CustomerService} from "../../service/customer.service";
import {MatDialog} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";
import {ICategories} from "../../interface-entity/ICategories";
import {timeout} from "rxjs/operators";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  listProduct: IProduct[] = [];
  idProduct: string = "";
  searchProduct!: FormGroup;
  listCarousel: IProduct[] = [];
  listCategories: ICategories[] = [];
  totalNumber: number = 0;
  username: string = '';
  hour: any;
  min: any;
  sec: any;
  quantity: number = 1;
  key:any;
  char: any;
  index: number = 0;
  constructor(private productService: ProductService, private loginService: LoginService, private customerService: CustomerService,
              private cartService: CartService, private router: Router, private alertService: AlertService,
              private route: ActivatedRoute, private dialog: MatDialog, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.totalNumber = this.cartService.getSoLuongGioHang();
    this.key = this.cartService.key;
    this.setCountDownTime();
    this.searchProduct = new FormGroup({
      key: new FormControl('')
    });
    this.productService.getAllCategories().subscribe((data) => {
      this.listCategories = data;

    });
    this.getList();
    this.username = this.loginService.getUserName();
    if (this.productService.key !== "") {
      this.searchProduct.value.key = this.productService.key;
      this.productService.searchListProduct(this.searchProduct.value.key).subscribe(data => {
        this.listProduct = data;
      }, error => {
        this.alertService.showAlertError("Không tìm thấy kết quả ");
      })
      this.productService.key = " ";
    } else {
      this.getList();
    }
  }
  numToString(num: number) {
    return num.toLocaleString().split(',').join(this.char || '.');
  }
  getList() {
    this.productService.getListProduct().subscribe((data) => {
      this.listProduct = data;
      this.listCarousel = data;
    })
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

  getDetail() {
    this.router.navigate(['/detail-product', {id: this.idProduct}])
  }

  search() {
    this.productService.searchListProduct(this.searchProduct.value.key).subscribe(data => {
      this.listProduct = data;
      for (let i = 0;i< this.listProduct.length; i++){
        this.index++;
      }
      this.alertService.showAlertSuccess("Tìm thấy "+ this.index + " sản phẩm");
      this.index = 0;
    }, error => {
      this.alertService.showAlertError("Không tìm thấy kết quả ");
    })
  }

  add(productId: string, productName: string, productPrice: number) {
    this.cartService.addToGioHang(productId, productName, productPrice,this.quantity);
    this.alertService.showAlertSuccess("Thêm giỏ hàng thành công");
    this.totalNumber = this.cartService.getSoLuongGioHang();
  }

  logOut() {
    this.loginService.removeToken();
    this.loginService.removeUserName();
    this.loginService.removeRole();
    this.cartService.xoaHet();
    this.router.navigateByUrl("/login").then();
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
        this.showSpinner('sp3');
        this.ngOnInit();
      })
    });
  }

  showSpinner(name: string) {
    this.spinner.show(name);
  }

  searchByCategories(categoryName: string) {
    this.productService.searchListProduct(categoryName).subscribe((data) => {
      this.listProduct = data;
      for (let i = 0;i< this.listProduct.length; i++){
        this.index++;

      }
      this.alertService.showAlertSuccess("Tìm thấy "+ this.index + " sản phẩm");
      this.index = 0;
    }, error => {
      this.alertService.showAlertError("Không tìm thấy kết quả");
    })
  }
  setCountDownTime() {
    let currentHours = new Date().getHours();
    var saleTime = new Date();
    var time = new Date();
    if (currentHours < 6) {
      saleTime.setHours(6);
      saleTime.setMinutes(0);
      saleTime.setSeconds(0);
    } else if (currentHours < 12) {
      saleTime.setHours(12);
      saleTime.setMinutes(0);
      saleTime.setSeconds(0);
    } else if (currentHours < 18) {
      saleTime.setHours(18);
      saleTime.setMinutes(0);
      saleTime.setSeconds(0);
    } else {
      saleTime.setHours(23);
      saleTime.setMinutes(59);
      saleTime.setSeconds(59);
    }
    // @ts-ignore
    let distance = saleTime - time;
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / (1000 * 60));
    let h = hours < 10 ? '0' + hours : hours;
    let m = hours < 10 ?  + minutes : minutes;
    let s = hours < 10 ? '0' + seconds : seconds;
    this.hour = h;
    this.min = m;
    this.sec = s;
  }


}
