import {ICustomer} from "./ICustomer";

export interface IAccount {
  account:string,
  password:string,
  dateCreate:Date
  customers: ICustomer
}
