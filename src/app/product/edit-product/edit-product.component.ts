import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ICategories} from "../../interface-entity/ICategories";
import {ISuppliers} from "../../interface-entity/ISuppliers";
import {UpdateProduct} from "../../interface-entity/UpdateProduct";
import {validSelectValidators} from "../../validator/valid-select.validators";
import {AlertService} from "../../alert.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProduct!: FormGroup;

  categoryList!: ICategories[];
  suppliersList!: ISuppliers[];
  productEdit!: UpdateProduct;


  constructor(private router: Router,
              private productService: ProductService,
              private dialog: MatDialogRef<EditProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private alertService : AlertService) {
  }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe((data) => {
      this.categoryList = data;
    });
    this.editProduct = new FormGroup({
      productId: new FormControl('', [Validators.required]),
      productName: new FormControl('', [Validators.required]),
      productQuantity: new FormControl('', [Validators.required]),
      productPrice: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
      trademark: new FormControl('',[Validators.required]),
      categoriesId: new FormControl('',[validSelectValidators()]),
      productImage: new FormControl(''),


    });
    this.productService.getProductById(this.data.productId).subscribe((data) => {
      this.editProduct.controls.productId.setValue(data.productId);
      this.editProduct.controls.productName.setValue(data.productName);
      this.editProduct.controls.productPrice.setValue(data.productPrice);
      this.editProduct.controls.productQuantity.setValue(data.productQuantity);
      // this.editProduct.controls.productImage.setValue(data.productImage);
      this.editProduct.controls.detail.setValue(data.detail);
      this.editProduct.controls.trademark.setValue(data.trademark);
      this.editProduct.controls.categoriesId.setValue(data.categories.categoryId);

      console.log(this.editProduct);
    });
  };

  onEditProduct() {

    if (this.editProduct.valid) {
      console.log(this.editProduct.value);
      console.log(this.editProduct.value.categories)
      const value = this.editProduct.value;
      let img = value.productImage;
      img = img.substr(12,img.length);
      this.productEdit = new UpdateProduct(value.productId,value.productName,value.productQuantity,value.productPrice,
        img,value.detail,value.trademark,value.categoriesId);
      this.productService.updateProduct(this.productEdit).subscribe((data) => {
        this.dialog.close();
        this.alertService.showAlertSuccess("Sửa thành công");
      })
    }
  }
}
