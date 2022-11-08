import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from "../../service/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../alert.service";

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {
  private id!: string;
  constructor(private employeeService: EmployeeService,private dialog: MatDialogRef<DeleteEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,private alertService : AlertService) { }

  ngOnInit(): void {
    this.id = this.data.id;
  }
  notDelete() {
    this.alertService.showAlertError("Hủy thành công");
  }

  delete() {
    this.employeeService.deleteEmployee(this.id).subscribe(()=>{
      this.dialog.close();
      this.alertService.showAlertSuccess("Xóa nhân viên "+ this.data.nameEmployee+ " thành công!");
    })
  }
}
