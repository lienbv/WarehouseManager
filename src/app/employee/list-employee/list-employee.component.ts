import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../service/employee.service";
import {IEmployee} from "../../interface-entity/IEmployee";
import {MatDialog} from "@angular/material/dialog";
import {DetailEmployeeComponent} from "../detail-employee/detail-employee.component";
import {EditEmployeeComponent} from "../edit-employee/edit-employee.component";
import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  listEmployee: IEmployee[] = [];
  indexPagination: number = 1;
  totalPagination: number = 0;
  searchEmployee!: FormGroup;

  constructor(private employeeService: EmployeeService,private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getListEmployee();
    this.searchEmployee = new FormGroup({
      key: new FormControl('')
      }
    )
  }

  getListEmployee() {
    this.employeeService.getAllEmployee().subscribe((data) => {
        // @ts-ignore
        this.listEmployee = data.content;
        this.totalPagination = data.totalPages;
      },
      () => {
        console.log("Lỗi get list employee");
      },
      () => {
        console.log("Get list employee thành công");
      })
  }

  openDialogDetail(id: string) {
  this.employeeService.getEmployeeById(id).subscribe((data)=>{
    const dialog = this.dialog.open(DetailEmployeeComponent,{
      width: '500px',
      data: data,
      disableClose: true,
      autoFocus: false
    });
    dialog.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  })
  }

  openDialogEdit(id: string) {
    this.employeeService.getEmployeeById(id).subscribe((data)=>{
      const dialog = this.dialog.open(EditEmployeeComponent,{
        width: '500px',
        data: data,
        disableClose: true,
        autoFocus: false
      });
      dialog.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    })
  }
  getPage(number: number) {
    this.employeeService.searchPageEmployee(number,this.searchEmployee.value.key).subscribe(data=>{
      this.listEmployee = data.content;
      this.indexPagination = data.pagealbe.pageNumber +1;
    })
  }
  openDialogDelete(id: string) {
    this.employeeService.getEmployeeById(id).subscribe((data)=>{
      const dialog = this.dialog.open(DeleteEmployeeComponent,{
        width: '500px',
        data: data,
        disableClose: true,
        autoFocus: false
      });
      dialog.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    })
  }

  search() {
    this.employeeService.searchPageEmployee(0,this.searchEmployee.value.key).subscribe((data)=>{
      this.listEmployee = data.content;
    })
  }

  seacrhEnter($event: KeyboardEvent) {
    this.employeeService.searchPageEmployee(0,this.searchEmployee.value.key).subscribe((data)=>{
      this.listEmployee = data.content;
    })
  }
}
