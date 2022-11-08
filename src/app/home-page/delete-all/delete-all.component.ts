import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../alert.service";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.component.html',
  styleUrls: ['./delete-all.component.css']
})
export class DeleteAllComponent implements OnInit {

  constructor(private alertService: AlertService,private cartService: CartService) { }

  ngOnInit(): void {
  }

  delete() {
    this.cartService.xoaHet();
    this.alertService.showAlertSuccess("Đã xóa")
  }
}
