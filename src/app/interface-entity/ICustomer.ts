import {IAccount} from "./IAccount";

export interface ICustomer {
  totalPages: number;
  idCustomer: string,
  nameCustomer: string,
  phone: string,
  email: string,
  idCard: string,
  address: string,
  account: IAccount
}
