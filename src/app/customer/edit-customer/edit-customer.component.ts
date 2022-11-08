import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../service/customer.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../alert.service";
import {ICustomer} from "../../interface-entity/ICustomer";
import {DtoCustomer} from "../../interface-entity/DtoCustomer";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  updateCustomer!: FormGroup;
  customerEdit!: DtoCustomer;
  constructor(private customerService: CustomerService,private dialog: MatDialogRef<EditCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private alertService: AlertService) { }

  ngOnInit(): void {
    this.updateCustomer = new FormGroup({
      idCustomer : new FormControl("",[Validators.required]),
      nameCustomer : new FormControl("",[Validators.required]),
      phone : new FormControl("",[Validators.required]),
      email : new FormControl("",[Validators.required,Validators.pattern(/^[A-Za-z_.0-9]+@+[a-z]+.[a-z]+.[a-z]+/)]),
      idCard : new FormControl("",[Validators.required]),
      address : new FormControl("",[Validators.required]),
      account : new FormControl("",[Validators.required]),
      passwork : new FormControl("",[Validators.required]),
    });
    this.customerService.getCustomerById(this.data.customers.idCustomer).subscribe((data)=>{
      this.updateCustomer.patchValue({
        idCustomer: data.customers.idCustomer,
        nameCustomer: data.customers.nameCustomer,
        phone: data.customers.phone,
        email: data.customers.email,
        idCard: data.customers.idCard,
        address: data.customers.address,
        account: data.account,
        passwork: data.password
      });
    })
  }

  create() {
  if (this.updateCustomer.valid){
    const value = this.updateCustomer.value;
    this.customerEdit = new DtoCustomer(value.idCustomer,value.nameCustomer,value.phone,
      value.email,value.idCard,value.address,value.account,value.passwork);
    this.customerService.updateCustomer(this.customerEdit).subscribe((data)=>{
      this.dialog.close();
      this.alertService.showAlertSuccess("Sửa thành công");
    })
  }
  }
}
