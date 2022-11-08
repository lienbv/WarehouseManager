import {ICategories} from "./ICategories";
import {ISuppliers} from "./ISuppliers";

export class CreateProduct {
  productId: string;
  productName: string;
  productQuantity: number;
  productPrice: number;
  productImage: string;
  detail: string;
  trademark: string;
  categoriesId: ICategories;


  constructor(productId: string, productName: string, productQuantity: number, productPrice: number, productImage: string, detail: string, trademark: string, categoriesId: ICategories) {
    this.productId = productId;
    this.productName = productName;
    this.productQuantity = productQuantity;
    this.productPrice = productPrice;
    this.productImage = productImage;
    this.detail = detail;
    this.trademark = trademark;
    this.categoriesId = categoriesId;
  }
}
