export class UpdateProduct {
  productId: string;
  productName: string;
  productQuantity: number;
  productPrice: number;
  productImage: string;
  detail: string;
  trademark:string;
  categoriesId: number;


  constructor(productId: string, productName: string, productQuantity: number, productPrice: number, productImage: string, detail: string, trademark: string, categoriesId: number) {
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
