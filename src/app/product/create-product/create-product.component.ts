import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {CreateProduct} from "../../interface-entity/CreateProduct";
import {Router} from "@angular/router";
import {AlertService} from "../../alert.service";
import {validSelectValidators} from "../../validator/valid-select.validators";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  createProduct!: FormGroup;
  categoryList: any;
  suppliersList: any;
  productId: string = "";
  createSp!: CreateProduct;

  constructor(private productService: ProductService,private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe((data)=>{
      this.categoryList = data;
      console.log("id" +data.values());
    });

    this.createProduct = new FormGroup({
      productId: new FormControl(''),
      productName: new FormControl('', [Validators.required]),
      productQuantity: new FormControl('', [Validators.required,Validators.min(0)]),
      productPrice: new FormControl('', [Validators.required,Validators.min(0)]),
      productImage: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
      categoriesId: new FormControl(0,[validSelectValidators()]),
      trademark: new FormControl('',[Validators.required])
    });

  }

  create() {
    this.productId = "SP" + Math.floor(Math.random() * 10000);

    console.log("đây là mã sp"+ this.productId);
    const value = this.createProduct.value;
    let img = value.productImage;
    img = img.substr(12,img.length);
    console.log(img);
    console.log(this.createProduct);
    this.createSp = new CreateProduct(this.productId,value.productName,value.productQuantity,value.productPrice,
     img,value.detail,value.trademark,value.categoriesId);
    this.productService.createProduct(this.createSp).subscribe(()=>{
      this.alertService.showAlertSuccess("Thêm thành công");
      this.router.navigate(['/product-list']);

    });
  }
}
