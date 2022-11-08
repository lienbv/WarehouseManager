import {Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {AlertService} from "../../alert.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {RegistrationComponent} from "../registration/registration.component";
import {NgxSpinnerService} from "ngx-spinner";
import {CustomerService} from "../../service/customer.service";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl('')
  });
  isOpenToast: boolean = false;
  isSubmit: boolean = false;

  constructor(private loginService: LoginService,private dialog: MatDialog,private router: Router,
              private customerService:CustomerService,private cartService:CartService,
              private element: ElementRef,private alertService:AlertService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.setFocus();
    let remember = this.loginService.getRememberMe();
    if(remember != null){
      this.login.userName.setValue(remember.username);
      this.login.password.setValue(remember.password);
      this.doLogin(remember.username, remember.password);
    }
    if(localStorage.getItem('username') !== null){
      this.login.userName.setValue(localStorage.getItem('username'));
    }
  }

  doSubmit() {
    console.log("ahihi");
    if(this.formLogin.valid){
      this.isSubmit = false;
      this.isOpenToast = false;
      this.doLogin(this.login.userName.value, this.login.password.value);

    }else{
      this.isSubmit = true;
    }
  }
  setFocus(){
    const elm = this.element.nativeElement.querySelector('#username');
    if(!elm?.autofocus){
      elm?.focus();
    }
  }
  doLogin(account: string,password: string){
    this.loginService.doLogin(account,password).subscribe((data)=>{
      console.log(account);
      if (data === null){
        this.setFocus();
        this.isOpenToast = true;
      }
      else {
        this.isOpenToast = false;
        localStorage.setItem('username',data.userName);
        this.loginService.saveUserName(data.userName);
        console.log(data.userName);
        this.loginService.saveToken(data.token);
        this.loginService.saveRole(data.role);
        console.log()
        this.alertService.showAlertSuccess(data.userName +" đã đăng nhập thành công");
        if (data.role === 'ROLE_USER'){
          this.router.navigateByUrl('/home').then();
        }else{
          this.router.navigateByUrl('/product-list').then();
        }
        if (this.formLogin.controls.rememberMe.value){
          this.loginService.setRememberMe(this.login.userName.value, this.login.password.value, 5);
        }
      }
    }, error => {
      this.isOpenToast = true;
    })
  }
  get login(){
    return this.formLogin.controls;
  }

  openRegistration() {
    this.customerService.getAllAccount().subscribe(data=>{
      const dialog = this.dialog.open(RegistrationComponent,{
        width: '1000px',
        height: '100%',
        disableClose: false,
        autoFocus: false,
        data: data
      });
      dialog.afterClosed().subscribe(result => {
        this.ngOnInit();
    })
    });
  }
  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideToast() {
    this.isOpenToast = false;
  }
}
