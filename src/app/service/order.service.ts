import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "./login.service";
import {DtoOrder} from "../interface-entity/DtoOrder";
import {Observable} from "rxjs";
import {OrderProduct} from "../interface-entity/OrderProduct";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly URL= "http://localhost:8080/order/";
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
  setOrder(dtoOrder: DtoOrder):Observable<any>{
    return this.httpClient.post<any>(this.URL+'orders',dtoOrder);

  }
  getOrdersByAccount(account: string):Observable<any>{
    return this.httpClient.get<any>(this.URL+'getOrders/' + account);
  }
  getListOrderProduct(account:string):Observable<OrderProduct[]>{
    return this.httpClient.get<OrderProduct[]>(this.URL + 'getListOrderProduct/'+account);
  }
  getListOrderAdmin():Observable<any>{
    return this.httpClient.get<any>(this.URL+'listOrder-Admin',this.httpOptions);
  }
  searchPageOrder(page:number,key:string):Observable<any>{
    return this.httpClient.get<any>(this.URL+'search' +'?page=' +page + '&account=' + key,this.httpOptions);
  }
  getListStatistic(startDate:string,endDate:string):Observable<any>{
    return this.httpClient.get<any>(this.URL+'statisticOrder?start=' + startDate + '&end=' + endDate,this.httpOptions);
  }
  getOrderProductByIdOrder(id: number):Observable<any>{
    return this.httpClient.get<any>(this.URL + 'finById/' + id,this.httpOptions);
  }
  deleteOrder(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.URL + 'delete/' + id,this.httpOptions)
  }
}
