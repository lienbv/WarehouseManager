import {Component, Inject, OnInit} from '@angular/core';
import {IProduct} from "../../interface-entity/IProduct";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CartService} from "../../service/cart.service";
import {AlertService} from "../../alert.service";
import {FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {ICategories} from "../../interface-entity/ICategories";
import {RegistrationComponent} from "../registration/registration.component";
import {CustomerService} from "../../service/customer.service";

@Component({
  selector: 'app-detail-view-product',
  templateUrl: './detail-view-product.component.html',
  styleUrls: ['./detail-view-product.component.css']
})
export class DetailViewProductComponent implements OnInit {
  product!: IProduct;
  listProduct: IProduct[] = [];
  productId: string = "";
  myThumbnail = "";
  totalNumber: number = 0;
  searchProduct!: FormGroup;
  username: string ='';
  listCategories: ICategories[]=[];
  quantity:number = 1;
  key:any;
  private char: any;
  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute,
              private cartService: CartService, private alertService: AlertService,private loginService:LoginService,
              private customerService: CustomerService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.username = this.loginService.getUserName();
    this.key = 1;
    this.totalNumber = this.cartService.getSoLuongGioHang();
    this.productService.getAllCategories().subscribe((data)=>{
      this.listCategories = data;
    });
    this.searchProduct = new FormGroup({
      key: new FormControl('')
    })
    this.activatedRoute.paramMap.subscribe((paramap) => {
      // @ts-ignore
      this.productId = paramap.get('id');
      console.log("đây là id " + this.productId);
      if (this.productId != null) {
        this.getProduct(this.productId);
      }
    })
  }

  getProduct(id: string) {
    console.log("đây là id " + id);
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
      this.myThumbnail = data.productImage;
    })
  }

  add(productId: string, productName: string, productPrice: number,quantity:number) {
    console.log(quantity);
    this.cartService.addToGioHang(productId, productName, productPrice,quantity);
    this.alertService.showAlertSuccess("Thêm giỏ hàng thành công");
    this.ngOnInit();
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

  quantity_up() {
    var quantityUp = 1;
    this.quantity += quantityUp;
    if(this.quantity > this.product.productQuantity){
      this.alertService.showAlertError("Số lượng còn lại không đủ để bạn tăng thêm");
      this.quantity = this.product.productQuantity;
    }
  }
  numToString(num: number) {
    return num.toLocaleString().split(',').join(this.char || '.');
  }
  quantity_down() {
    var quantityDown = 1;
    this.quantity -= quantityDown;
    if (this.quantity <= 0){
      alert("Số lượng không được bé hơn 1");
      this.quantity = 1;
    }
  }
}
