import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API: string = 'http://localhost:8080/';
  FIRST_USERNAME: string = 'CTIwGGVDooOmNfUpvsFM';
  FIRST_PASSWORD: string = 'SxbaNxSguVlzGbNlsJep';
  USER_NAME: string = 'bD9EdCjnZHOsH1Wkop4r';
  ROLE: string = 'tSUJTZyGodr7kbSb9Lo8';
  message: string = '';
  username: string | undefined;
  role: string | undefined;

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }

  doLogin(userName: string, password: string): Observable<any>{
    return this.http.post<any>(this.API + 'login', {
      userName: userName,
      password: password
    });
  }

  doChangePassword(username: string, password: string, newPassword: string): Observable<any>{
    return this.http.post(this.API + 'change-password', {
      username: username,
      password: password,
      newPassword: newPassword
    },{
      headers: new HttpHeaders({'Authorization': this.getToken()})
    })
  }

  saveToken(token: string): void{
    this.cookieService.set('Token', btoa(token), {expires: 0});
  }

  getToken(): string{
    let token: string = this.cookieService.get('Token');
    return token === '' ? '' : 'Token ' + atob(token);
  }

  removeToken(): void{
    this.cookieService.delete('Token');
  }

  saveUserName(username: string): void{
    this.cookieService.set(this.USER_NAME, btoa(username), {expires: 0});
  }

  getUserName(): string{
    let temp = this.cookieService.get(this.USER_NAME);
    return temp === '' ? '' : atob(temp);
  }

  removeUserName(){
    this.cookieService.delete(this.USER_NAME);
  }

  setMessage(message: string): void{
    this.message = message;
  }

  getMessage(): string{
    return this.message;
  }

  saveRole(role: string){
    // localStorage.setItem('role', role);
    this.cookieService.set(this.ROLE, btoa(role), {expires: 0});
  }

  getRole(): string{
    let temp = this.cookieService.get(this.ROLE);
    return temp === '' ? '' : atob(temp);
  }

  removeRole(){
    this.cookieService.delete(this.ROLE);
  }

  setRememberMe(username: string, password: string, days: number): void{
    this.removeRememberMe();
    let encodeUserName: string = username;
    let encodePassword: string = password;
    for(let i=0; i<11; i++){
      encodeUserName = btoa(encodeUserName);
      encodePassword = btoa(encodePassword);
    }
    encodeUserName = this.FIRST_USERNAME + encodeUserName;
    encodePassword = this.FIRST_PASSWORD + encodePassword;
    let d:Date = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = ``;
    document.cookie = `${encodeUserName}=${encodePassword}; ${expires}${cpath}`;
  }

  getRememberMe(): any {
    let cookie = this.getCookie();
    if(cookie == null){
      return null;
    }
    let decodeUserName: string = cookie.username;
    let decodePassword: string = cookie.password;
    decodeUserName = decodeUserName.substring(20, decodeUserName.length);
    decodePassword = decodePassword.substring(20, decodePassword.length);
    for (let i=0; i<11; i++){
      decodeUserName = atob(decodeUserName);
      decodePassword = atob(decodePassword);
    }
    return {
      username: decodeUserName,
      password: decodePassword
    }
  }

  removeRememberMe(): void{
    let cookie = this.getCookie();
    if(cookie == null){
      return;
    }
    let encodeUserName: string = cookie.username;
    let d:Date = new Date();
    d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = ``;
    document.cookie = `${encodeUserName}=; ${expires}${cpath}`;
  }

  getCookie(): any {
    let decodeUserName: string = '';
    let decodePassword: string = '';
    let status: boolean = false;
    let cookie = document.cookie.split('; ');
    for (let i=0; i<cookie.length; i++){
      let temp = cookie[i].split('=');
      if(status){
        break;
      }
      temp.forEach(item => {
        if(item.indexOf(this.FIRST_USERNAME) == 0){
          status = true;
          decodeUserName = item;
        }
        if (item.indexOf(this.FIRST_PASSWORD) == 0){
          status = true;
          decodePassword = item;
        }
      })
    }
    if(!status){
      return null;
    }
    return {
      username: decodeUserName,
      password: decodePassword
    }
  }

  testJwt(): Observable<any>{
    return this.http.get<any>(this.API + "random", {
      headers: new HttpHeaders({
        'Authorization': this.getToken()
      })

    })
  }
  
  signOut() {
    window.sessionStorage.clear();
  }
}
