import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HeaderFooterModule} from "../header-footer/header-footer.module";
import {AppModule} from "../app.module";
import {RouteCustomerModule} from "./route-customer.module";
import {DetailCustomerComponent} from "./detail-customer/detail-customer.component";
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [

    DetailCustomerComponent,
    DeleteCustomerComponent,
    EditCustomerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderFooterModule,
    RouteCustomerModule,
    MatDialogModule,

  ]
})
export class CustomerModule { }
