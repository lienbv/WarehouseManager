import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../service/employee.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert.service";
import {IPosition} from "../../interface-entity/IPosition";
import {validSelectValidators} from "../../validator/valid-select.validators";
import {DtoEmployee} from "../../interface-entity/DtoEmployee";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  createEmployee!: FormGroup;
  positionList!: IPosition[];
  id: string = "";
  createNV!: DtoEmployee;
  constructor(private employeeService: EmployeeService,private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.employeeService.getListPosition().subscribe((data)=>{
      this.positionList = data;
      console.log(this.positionList);
    });
    this.createEmployee = new FormGroup({
      id : new FormControl('',[Validators.required]),
      nameEmployee : new FormControl('',[Validators.required]),
      dateOfBirth : new FormControl('',[Validators.required]),
      idCard : new FormControl('',[Validators.required]),
      salary : new FormControl('',[Validators.required,Validators.min(0)]),
      phoneNumber : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z_.0-9]+@+[a-z]+.[a-z]+.[a-z]+/)]),
      address : new FormControl('',[Validators.required]),
      level : new FormControl('',[Validators.required]),
      avatar : new FormControl('',[Validators.required]),
      positionId : new FormControl(0,[validSelectValidators()]),
    });
  }

  create() {
  this.id = "NV" + Math.floor(Math.random()*10000);
  const value = this.createEmployee.value;
  let avt = value.avatar;
  avt = avt.substr(12,avt.length);
  this.createNV = new DtoEmployee(this.id,value.nameEmployee,value.dateOfBirth,value.idCard,value.salary,value.phoneNumber,
    value.email,value.address,value.level,avt,value.positionId);
  this.employeeService.createEmployee(this.createNV).subscribe(()=>{
    this.alertService.showAlertSuccess("Thêm thành công");
    this.router.navigate(['/employee-list']);
  })
  }

}
