import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../service/employee.service";

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private dialog: MatDialogRef<DetailEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

}
