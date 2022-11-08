import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListProductComponent} from "./list-product/list-product.component";
import {CreateProductComponent} from "./create-product/create-product.component";
import {AuthGuard} from "../service/AuthGuard";

const routes: Routes = [
  {path: "product-list",component: ListProductComponent,canActivate:[AuthGuard]},
  {path: "createProduct",component: CreateProductComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class RouteProductModule { }
