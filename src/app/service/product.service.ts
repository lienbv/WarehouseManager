import {Injectable} from '@angular/core';
import {IProduct} from "../interface-entity/IProduct";
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICategories} from "../interface-entity/ICategories";
import {ISuppliers} from "../interface-entity/ISuppliers";
import {UpdateProduct} from "../interface-entity/UpdateProduct";
import {CreateProduct} from "../interface-entity/CreateProduct";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product!: IProduct[];
  readonly URL = "http://localhost:8080/product/";
  readonly URL_SEARCH = "http://localhost:8080/product/search";
  readonly URL_SUPPLIERS = "http://localhost:8080/suppliers/";
  key: string = " ";
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

  getAllProduct():Observable<any> {
    return this.httpClient.get<any>(this.URL + 'list',this.httpOptions);
  }
  getListProduct():Observable<any>{
    return this.httpClient.get<any>(this.URL + 'listAllProduct');
  }
  getPageProduct(pageNum: number):Observable<any>{
    return this.httpClient.get<any>(this.URL+'list?page='+pageNum);
  }
  getProductById(id:string):Observable<IProduct>{
    return this.httpClient.get<IProduct>(this.URL+'getInformation/'+id);
  }
  deleteProduct(id:string):Observable<HttpEvent<IProduct>>{
    return this.httpClient.delete<IProduct>(this.URL + 'delete/' + id,this.httpOptions);
  }
  createProduct(product: CreateProduct):Observable<any>{
    return this.httpClient.post<any>(this.URL+'create',product,this.httpOptions);
  }
  updateProduct(product: UpdateProduct):Observable<any>{
    return this.httpClient.put<any>(this.URL+'edit',product,this.httpOptions);
  }
  getAllCategories():Observable<any>{
    return this.httpClient.get<any>(this.URL + 'catagory');
  }

  searchPageProduct(pageNumber: number, key: string):Observable<any>{
    return this.httpClient.get<any>(this.URL_SEARCH + '?page='+ pageNumber +'&key=' + key,this.httpOptions);
  }
  searchProduct(key:string):Observable<any>{
    return this.httpClient.get<any>(this.URL_SEARCH + '?key=' +key,this.httpOptions);
  }
  searchListProduct(key:string):Observable<any>{
    return this.httpClient.get<any>(this.URL+'listSearch'+'?key='+key);
  }
}
