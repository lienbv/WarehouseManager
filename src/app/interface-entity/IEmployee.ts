import {IPosition} from "./IPosition";

export interface IEmployee {
  totalPages: number;
  id: string,
  nameEmployee: string,
  dateOfBirth: string,
  idCard: string,
  salary: number,
  phoneNumber: string,
  email: string,
  address: string,
  level: string,
  avatar: string,
  position: IPosition,
}
