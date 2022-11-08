import {ICategories} from "./ICategories";
import {ISuppliers} from "./ISuppliers";

export interface IProduct {
  totalPages: number;
  content: IProduct[];
  productId: string,
  productName: string,
  productQuantity: number,
  productPrice: number,
  productImage: string,
  detail: string,
  trademark: string,
  categories: ICategories,

}
