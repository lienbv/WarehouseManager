import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IEmployee} from "../interface-entity/IEmployee";
import {DtoEmployee} from "../interface-entity/DtoEmployee";
import {IPosition} from "../interface-entity/IPosition";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly URL= "http://localhost:8080/employee/";
  readonly URL_SEARCH = "http://localhost:8080/employee/search";
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
  getAllEmployee():Observable<any>{
    return this.httpClient.get<IEmployee>(this.URL+'list',this.httpOptions);
  }
  getListPosition():Observable<any>{
    return this.httpClient.get<any>(this.URL+'position',this.httpOptions);
  }
  getEmployeeById(id:string):Observable<any>{
    return this.httpClient.get<any>(this.URL+'getInformation/'+id,this.httpOptions);
  }
  deleteEmployee(id:string):Observable<any>{
    return this.httpClient.delete<any>(this.URL+'delete/'+id,this.httpOptions);
  }
  createEmployee(employee: DtoEmployee):Observable<any>{
    return this.httpClient.post<any>(this.URL + 'create', employee,this.httpOptions);
  }
  updateEmployee(employee:DtoEmployee):Observable<any>{
    return this.httpClient.put<any>(this.URL+'edit',employee,this.httpOptions);
  }
  getPageProduct(number: number):Observable<any> {
    return this.httpClient.get<any>(this.URL + 'list?page='+number,this.httpOptions);
  }
  searchPageEmployee(pageNumber: number,key: string):Observable<any>{
    return this.httpClient.get<any>(this.URL_SEARCH + '?page='+pageNumber + '&key='+key,this.httpOptions);
  }
  searchEmployee(key:string):Observable<any>{
    return this.httpClient.get<any>(this.URL_SEARCH + '?key='+key);
  }
}
