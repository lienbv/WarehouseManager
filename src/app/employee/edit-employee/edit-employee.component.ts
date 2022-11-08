import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validSelectValidators} from "../../validator/valid-select.validators";
import {EmployeeService} from "../../service/employee.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert.service";
import {IPosition} from "../../interface-entity/IPosition";
import {DtoEmployee} from "../../interface-entity/DtoEmployee";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  createEmployee!: FormGroup;
  positionList!: IPosition[];
  id: string = "";
  employeeEdit!: DtoEmployee;
  constructor(private employeeService: EmployeeService,private router: Router, private alertService: AlertService,
              private dialog: MatDialogRef<EditEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    this.employeeService.getEmployeeById(this.data.id).subscribe((data)=>{
      this.createEmployee.controls.id.setValue(data.id);
      this.createEmployee.controls.nameEmployee.setValue(data.nameEmployee);
      this.createEmployee.controls.dateOfBirth.setValue(formatDate(data.dateOfBirth, "yyyy-MM-dd", 'en-US'));
      this.createEmployee.controls.idCard.setValue(data.idCard);
      this.createEmployee.controls.salary.setValue(data.salary);
      this.createEmployee.controls.phoneNumber.setValue(data.phoneNumber);
      this.createEmployee.controls.email.setValue(data.email);
      this.createEmployee.controls.address.setValue(data.address);
      this.createEmployee.controls.level.setValue(data.level);
      this.createEmployee.controls.positionId.setValue(data.position.positionId);
    })
  }


  onEditEmployee() {
  if (this.createEmployee.valid){
    const value = this.createEmployee.value;
    let avt = value.avatar;
    avt = avt.substr(12,avt.length);
    this.employeeEdit = new DtoEmployee(value.id,value.nameEmployee,value.dateOfBirth,
      value.idCard,value.salary,value.phoneNumber,value.email,value.address,value.level,
      avt,value.positionId);
    this.employeeService.updateEmployee(this.employeeEdit).subscribe((data)=>{
      this.dialog.close();
      this.alertService.showAlertSuccess("Sửa thành công");
    })
  }
  }
}
