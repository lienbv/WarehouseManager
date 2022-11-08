import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {CustomerService} from "../../service/customer.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert.service";
import {DtoCustomer} from "../../interface-entity/DtoCustomer";
import {NgxSpinnerService} from "ngx-spinner";
import {IAccount} from "../../interface-entity/IAccount";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  createCustomer!: FormGroup;
  idCustomer: string = "";
  createKH!: DtoCustomer;
  accountList:IAccount[]=[];
  constructor(private customerService: CustomerService, private router: Router, private alertService: AlertService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.customerService.getAllAccount().subscribe((data)=>{
      this.accountList = data;
      console.log(this.accountList);
    })
    this.createCustomer = new FormGroup({
      idCustomer: new FormControl("", [Validators.required]),
      nameCustomer: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z_.0-9]+@+[a-z]+.[a-z]+.[a-z]+/)]),
      idCard: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      account: new FormControl("", [Validators.required]),
      passwork: new FormControl("", [Validators.required]),
    })
  }

  showSpinner(name: string) {
    this.spinner.show(name);
  }

  check(form: AbstractControl): ValidationErrors | null {

    const accountCheck = form.value.account;
    for (let i = 0; i < this.accountList.length; i++) {
      if (accountCheck === this.accountList[i].account) {
        return {check: true}
      }
    }
    return null;
  }

  create() {
    this.idCustomer = "KH" + Math.floor(Math.random() * 10000);
    const value = this.createCustomer.value;
    this.createKH = new DtoCustomer(this.idCustomer, value.nameCustomer, value.phone, value.email, value.idCard,
      value.address, value.account, value.passwork);
    this.customerService.createCustomer(this.createKH).subscribe(() => {
      this.alertService.showAlertSuccess("Thêm thành công");
      this.router.navigate(['/customer-list']);
    })
  }
}
