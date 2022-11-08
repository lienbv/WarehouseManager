import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICustomer} from "../interface-entity/ICustomer";
import {IEmployee} from "../interface-entity/IEmployee";
import {DtoEmployee} from "../interface-entity/DtoEmployee";
import {DtoCustomer} from "../interface-entity/DtoCustomer";
import {LoginService} from "./login.service";
import {DtoAccount} from "../interface-entity/DtoAccount";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  readonly URL="http://localhost:8080/customer/";
  readonly URL_SEARCH = "http://localhost:8080/customer/search";
  httpOptions: any;
  constructor(private httpClient: HttpClient,private loginService:LoginService) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.loginService.getToken(),
        'Access-Control-Allow-Origin': 'http://localhost:4200/',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      }),
    };
  }
  getAllCustomer():Observable<any>{
    return this.httpClient.get<any>(this.URL + 'list',this.httpOptions);
  }
  getAllAccount():Observable<any>{
    return this.httpClient.get<any>(this.URL + 'account');
  }
  getCustomerById(id:string):Observable<any> {
    return this.httpClient.get<ICustomer>(this.URL + 'getInforByAdmin/' + id,this.httpOptions);
  }
  deleteCustomer(id:string):Observable<any>{
    return this.httpClient.delete<ICustomer>(this.URL+'delete/'+id,this.httpOptions);
  }
  getCustomerByAccount(account:string):Observable<any>{
    return this.httpClient.get<any>(this.URL+'detailCustomerByAccount/'+ account);
  }
  createCustomer(customer: DtoCustomer):Observable<DtoCustomer>{
    return this.httpClient.post<DtoCustomer>(this.URL + 'create', customer);
  }
  updateCustomer(customer:DtoCustomer):Observable<any>{
    return this.httpClient.put<any>(this.URL+'edit',customer,this.httpOptions);
  }
  searchPageCustomer(pageNumber: number, key:string):Observable<any>{
    return this.httpClient.get<any>(this.URL_SEARCH + '?page='+ pageNumber +'&key=' + key,this.httpOptions);
  }
  getAccount(id:string):Observable<any>{
    return this.httpClient.get<any>(this.URL + 'getByAccount/'+id);
  }
  changePassWord(dtoAccount: DtoAccount):Observable<any>{
    return this.httpClient.put<any>(this.URL+'changePassWord',dtoAccount);
  }
}
