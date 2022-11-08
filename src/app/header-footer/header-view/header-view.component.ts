import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {IProduct} from "../../interface-entity/IProduct";
import {LoginService} from "../../service/login.service";
import {CartService} from "../../service/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-view',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.css']
})
export class HeaderViewComponent implements OnInit {
  searchProduct!: FormGroup;
  listProduct: IProduct[] = [];
  username: string ='';
  totalNumber: number = 0;
  constructor(private productService: ProductService,private cartService:CartService,private loginService:LoginService,private router: Router) { }

  ngOnInit(): void {
    this.username = this.loginService.getUserName();
    this.totalNumber = this.cartService.getSoLuongGioHang();
    this.searchProduct = new FormGroup({
      key: new FormControl('')
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
    this.router.navigateByUrl("/login").then();
  }
}
