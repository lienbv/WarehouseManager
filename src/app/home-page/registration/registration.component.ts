import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {CustomerService} from "../../service/customer.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert.service";
import {NgxSpinnerService} from "ngx-spinner"
import {DtoCustomer} from "../../interface-entity/DtoCustomer";
import {IAccount} from "../../interface-entity/IAccount";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null
}
function checkExistAccount(account:IAccount[]):ValidatorFn {
  return (control:AbstractControl): ValidationErrors | null =>{
    for (let i = 0; i< account.length; i++){
      if(control.value === account[i].account){
        return {checkExistAccount: true}
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  createCustomer!: FormGroup;
  idCustomer: string = "";
  createKH!: DtoCustomer;

  constructor(private customerService: CustomerService, private router: Router, private alertService: AlertService,
              private spinner: NgxSpinnerService,public dialogRef: MatDialogRef<RegistrationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IAccount[]) {
  }

  ngOnInit(): void {
    this.createCustomer = new FormGroup({
      nameCustomer: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required,Validators.pattern('^(\\d{10,12})$')]),
      email: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z_.0-9]+@+[a-z]+.[a-z]+.[a-z]+/)]),
      account: new FormControl("", [Validators.required,checkExistAccount(this.data)]),
      passwork: new FormControl("", [Validators.required]),
    })
  }

  create() {
    console.log("aaaa")
    const value = this.createCustomer.value;
    value.idCard = "Trống";
    value.address = "Trống";
    if (this.createCustomer.valid) {
      console.log("bbbbb");
      this.idCustomer = "KH" + Math.floor(Math.random() * 10000);
      this.createKH = new DtoCustomer(this.idCustomer, value.nameCustomer, value.phone, value.email, value.idCard,
        value.address, value.account, value.passwork);
      this.customerService.createCustomer(this.createKH).subscribe(() => {
        this.alertService.showAlertSuccess("Tạo thành công");
        this.hideSpinner("sp3");
      })
    }

  }

  showSpinner(name: string) {
    this.spinner.show(name);
  }
  hideSpinner(name: string) {
    this.spinner.hide(name);
  }
}
