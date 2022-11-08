import {IProduct} from "./IProduct";
import {UpdateProduct} from "./UpdateProduct";
import {DtoProduct} from "./DtoProduct";

export interface DtoOrder {
  ordersId:number;
  idProduct: DtoProduct[];
  account: string;
  userName:string;
  address:string;
  phone:string;
  total:number;
  quantity:number;


}
