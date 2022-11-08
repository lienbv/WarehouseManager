import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../alert.service";

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  private id!: string;

  constructor(private productService: ProductService, private dialog: MatDialogRef<DeleteProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,private alertService : AlertService) { }

  ngOnInit(): void {
    this.id = this.data.productId;
  }

  notDelete() {
    this.alertService.showAlertError("Hủy thành công");
  }

  delete() {
    this.productService.deleteProduct(this.id).subscribe(()=>{
      this.dialog.close();
      this.alertService.showAlertSuccess("Xóa sản phẩm thành công!");
    })
  }
}
