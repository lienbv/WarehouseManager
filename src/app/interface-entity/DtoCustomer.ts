export class DtoCustomer {
  idCustomer: string;
  nameCustomer: string;
  phone: string;
  email: string;
  idCard: string;
  address: string;
  account: string;
  passwork: string;

  constructor(idCustomer: string, nameCustomer: string, phone: string, email: string, idCard: string, address: string, account: string, passwork: string) {
    this.idCustomer = idCustomer;
    this.nameCustomer = nameCustomer;
    this.phone = phone;
    this.email = email;
    this.idCard = idCard;
    this.address = address;
    this.account = account;
    this.passwork = passwork;
  }
}
