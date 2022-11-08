import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../interface-entity/IProduct";
import {ProductService} from "../../service/product.service";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProductComponent} from "../delete-product/delete-product.component";
import {DetailProductComponent} from "../detail-product/detail-product.component";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  listProduct: IProduct[] = [];
  indexPagination: number = 1;
  totalPagination: number = 0;
  char: any;
  searchProduct!: FormGroup;

  constructor(private productService: ProductService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getListProduct();

    this.searchProduct = new FormGroup({
      key: new FormControl('')
    })
  }
  getPage(number: number) {
    this.productService.searchPageProduct(number,this.searchProduct.value.key).subscribe((data)=>{
      this.listProduct = data.content;
      this.indexPagination = data.pageable.pageNumber + 1;
    })
  }
  getListProduct() {
    this.productService.getAllProduct().subscribe(
      data => {
        this.listProduct = data.content;
        this.totalPagination = data.totalPages;
        console.log(data);
      },
      () => {
        console.log("Lỗi");
      }, () => {
        console.log("Complete");
      }
    )
  }

  openDialogEdit(idProduct: string) {
    this.productService.getProductById(idProduct).subscribe((data) => {
      const dialog = this.dialog.open(EditProductComponent, {
        width: '1000px',
        data: data,
        disableClose: true,
        autoFocus: false
      })
      dialog.afterClosed().subscribe(result => {

        this.ngOnInit();
      });
    })
  }

  openDialogDelete(productId: string) {
    this.productService.getProductById(productId).subscribe((data) => {
      const dialog = this.dialog.open(DeleteProductComponent, {
        width: '500px',
        data: data,
        disableClose: true,
        autoFocus: false
      });
      dialog.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    })
  }

  openDialogDetail(productId: string) {
    this.productService.getProductById(productId).subscribe((data) => {
      const dialog = this.dialog.open(DetailProductComponent, {
        width: '500px',
        data: data,
        disableClose: true,
        autoFocus: false
      });
      dialog.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    })
  }


  search() {
    this.productService.searchPageProduct(0,this.searchProduct.value.key).subscribe((data)=>{
      this.listProduct = data.content;
    })
  }

  seacrhEnter($event: KeyboardEvent) {
    this.productService.searchPageProduct(0,this.searchProduct.value.key).subscribe((data)=>{
      this.listProduct = data.content;

    })
  }

  numToString(num: number) {
    return num.toLocaleString().split(',').join(this.char || '.');
  }
}
