import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderViewComponent } from './header-view/header-view.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [


    FooterComponent,
      HeaderViewComponent
  ],
    exports: [
        FooterComponent,
        HeaderViewComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class HeaderFooterModule { }
