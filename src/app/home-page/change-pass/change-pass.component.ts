import {Component, ElementRef, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert.service";
import {MatDialog} from "@angular/material/dialog";

function checkPassword(input: AbstractControl): ValidationErrors | null {
  if (input.value.newPassword !== input.value.confirmPassword){
    return {checkPassword: true}
  }
  return null;
}

function checkEqualsPassword(input: AbstractControl): ValidationErrors | null {
  if(input.value.password === input.value.passwordGroup.newPassword){
    return {checkEqualsPassword: true}
  }
  return null;
}

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  isOpenToast: boolean = false;
  isSubmit: boolean = false;
  username: string | null = '';
  formChangePassword: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    passwordGroup: new FormGroup({
      newPassword: new FormControl('', [Validators.required,
        Validators.pattern('^((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&\'()*+,-.:;<=>?@[\\]^_`{|}~]).{6,12})$')]),
      confirmPassword: new FormControl('', [Validators.required])
    }, [checkPassword])
  }, [checkEqualsPassword]);
  constructor(private titleService: Title,
              private loginService: LoginService,
              private router: Router,
              private element: ElementRef,private dialog: MatDialog,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.setFocus();
    if (this.loginService.getUserName() !== null){
      this.username = this.loginService.getUserName();
    }else{
      this.router.navigateByUrl("/login").then();
    }
  }

  setFocus(){
    const elm = this.element.nativeElement.querySelector('#password');
    if(!elm?.autofocus){
      elm?.focus();
    }
  }

  hideToast(): void{
    this.isOpenToast = false;
  }

  doSubmit(): void{
    if(this.formChangePassword.valid){
      this.isSubmit = false;
      this.isOpenToast = false;
      if(this.username !== null){
        this.loginService.doChangePassword(this.username, this.form.password.value, this.newPassword?.value)
          .subscribe(result => {
            if(result.message !== 'success'){
              this.setFocus();
              this.alertService.showAlertError("Mật khẩu cũ chưa đúng");
              this.isOpenToast = true;
            }else{
              this.isOpenToast = false;
              this.loginService.message = 'success';
              this.dialog.closeAll();
              this.alertService.showAlertSuccess("Đổi mật khẩu thành công");
              this.router.navigateByUrl('/login').then();
              this.loginService.removeToken();
              this.loginService.removeUserName();
              this.loginService.removeRole();
            }
          }, error => {
            this.isOpenToast = true;
          })
      }
    }else{
      this.isSubmit = true;
    }
  }

  get form(){
    return this.formChangePassword.controls;
  }

  get newPassword(){
    return this.formChangePassword.get("passwordGroup.newPassword")
  }

  get confirmPassword(){
    return this.formChangePassword.get("passwordGroup.confirmPassword")
  }

  cancel(){
    // this.router.navigateByUrl("/home").then();
  }

}
