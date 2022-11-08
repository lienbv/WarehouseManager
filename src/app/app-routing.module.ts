import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListProductComponent} from "./product/list-product/list-product.component";
import {CreateProductComponent} from "./product/create-product/create-product.component";
import {ListEmployeeComponent} from "./employee/list-employee/list-employee.component";
import {CreateEmployeeComponent} from "./employee/create-employee/create-employee.component";
import {HomeComponent} from "./home-page/home/home.component";
import {DetailProductComponent} from "./product/detail-product/detail-product.component";
import {DetailViewProductComponent} from "./home-page/detail-view-product/detail-view-product.component";
import {AuthGuard} from "./service/AuthGuard";
import {OrderAdminComponent} from "./order-admin/order-admin.component";
import {StatisticComponent} from "./statistic/statistic.component";

const routes: Routes = [


  //employee
  {path: "employee-list",component: ListEmployeeComponent,canActivate:[AuthGuard]},
  {path: "createEmployee",component: CreateEmployeeComponent,canActivate:[AuthGuard]},
  //
  //home
  {path:"",component: HomeComponent},
  {path: "home",component: HomeComponent,data:{breadcrumb: 'Home'}},
  {path:"detail-product/:id",component: DetailViewProductComponent},
  {path:"list-order-admin",component: OrderAdminComponent},
  {path:"statistic",component: StatisticComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
