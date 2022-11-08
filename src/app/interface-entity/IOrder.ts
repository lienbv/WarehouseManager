import {IAccount} from "./IAccount";
import {IStatusOrder} from "./IStatusOrder";

export interface IOrder {
  ordersId:number,
  orderDate: Date,
  address:string,
  userName:string,
  phone:string,
  total: number,
  statusContract: IStatusOrder,
  account:IAccount
}
