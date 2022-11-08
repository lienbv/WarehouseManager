import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from "../../service/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../alert.service";
import {CustomerService} from "../../service/customer.service";

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  private id!: string;
  constructor(private customerService: CustomerService,private dialog: MatDialogRef<DeleteCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,private alertService : AlertService) { }

  ngOnInit(): void {
    this.id = this.data.idCustomer;
  }
  notDelete() {
    this.alertService.showAlertError("Hủy thành công");
  }

  delete() {
    this.customerService.deleteCustomer(this.id).subscribe(()=>{
      this.dialog.close();
      this.alertService.showAlertSuccess("Xóa khách hàng "+ this.data.nameCustomer+ " thành công!");
    })
  }
}
