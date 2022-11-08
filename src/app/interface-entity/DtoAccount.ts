import {ICustomer} from "./ICustomer";

export class DtoAccount {
  account:string;
  password:string;
  dateCreate:Date;
  customerId: string

  constructor(account: string, password: string, dateCreate: Date, customerId: string) {
    this.account = account;
    this.password = password;
    this.dateCreate = dateCreate;
    this.customerId = customerId;
  }
}
