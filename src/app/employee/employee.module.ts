import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import {RouterModule} from "@angular/router";
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {AppModule} from "../app.module";



@NgModule({
  declarations: [

    EditEmployeeComponent,
    DeleteEmployeeComponent,
    DetailEmployeeComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatDialogModule,

    ]
})
export class EmployeeModule { }
