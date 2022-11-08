import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListProductComponent} from "../product/list-product/list-product.component";
import {ListCustomerComponent} from "./list-customer/list-customer.component";
import {CreateCustomerComponent} from "./create-customer/create-customer.component";
import {AuthGuard} from "../service/AuthGuard";


const routes: Routes = [
  {path: "customer-list",component: ListCustomerComponent,canActivate: [AuthGuard]},
  {path: "createCustomer",component: CreateCustomerComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class RouteCustomerModule { }
