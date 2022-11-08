import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {DetailProductComponent} from "./detail-product/detail-product.component";
import {HeaderFooterModule} from "../header-footer/header-footer.module";
import {AppModule} from "../app.module";
import {RouteProductModule} from "./route-product.module";




@NgModule({
  declarations: [


    EditProductComponent,
    DeleteProductComponent,
    DetailProductComponent


  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
    HeaderFooterModule,
    RouteProductModule



  ]
})
export class ProductModule { }
