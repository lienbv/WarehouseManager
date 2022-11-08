import {IPosition} from "./IPosition";

export class DtoEmployee {
  id: string;
  nameEmployee: string;
  dateOfBirth: string;
  idCard: string;
  salary: number;
  phoneNumber: string;
  email: string;
  address: string;
  level: string;
  avatar: string;
  positionId: IPosition;

  constructor(id: string, nameEmployee: string, dateOfBirth: string, idCard: string, salary: number, phone: string, email: string, address: string, level: string, avatar: string, position: IPosition) {
    this.id = id;
    this.nameEmployee = nameEmployee;
    this.dateOfBirth = dateOfBirth;
    this.idCard = idCard;
    this.salary = salary;
    this.phoneNumber = phone;
    this.email = email;
    this.address = address;
    this.level = level;
    this.avatar = avatar;
    this.positionId = position;
  }
}
