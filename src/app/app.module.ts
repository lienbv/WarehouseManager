import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductModule} from "./product/product.module";
import {CustomerModule} from "./customer/customer.module";
import {EmployeeModule} from "./employee/employee.module";
import {HeaderComponent} from './header-footer/header/header.component';

import {HeaderFooterModule} from "./header-footer/header-footer.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import {HomePageModule} from "./home-page/home-page.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ListEmployeeComponent} from "./employee/list-employee/list-employee.component";
import {ListProductComponent} from "./product/list-product/list-product.component";
import {CreateProductComponent} from "./product/create-product/create-product.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {CreateEmployeeComponent} from "./employee/create-employee/create-employee.component";
import {RouterHomeModule} from "./home-page/router-home.module";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import {ListCustomerComponent} from "./customer/list-customer/list-customer.component";
import {CreateCustomerComponent} from "./customer/create-customer/create-customer.component";
import { NgxSpinnerModule } from "ngx-spinner";
import {CookieService} from "ngx-cookie-service";
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { StatisticComponent } from './statistic/statistic.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {DatePipe} from "@angular/common";




@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    ListProductComponent,
    CreateProductComponent,
    HeaderComponent,
    CreateEmployeeComponent,
    ListCustomerComponent,
    CreateCustomerComponent,
    OrderAdminComponent,
    StatisticComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    CustomerModule,
    EmployeeModule,
    HeaderFooterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomePageModule,
    ToastrModule.forRoot(),
    NgbModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterHomeModule,
    SlickCarouselModule,
    NgxImageZoomModule,
    NgxSpinnerModule,
    NgApexchartsModule,

  ],
  providers: [DatePipe,CookieService],
  exports: [
    HeaderComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
