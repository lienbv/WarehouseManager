
import {IProduct} from "./IProduct";
import {IOrder} from "./IOrder";
import {IdOrderProduct} from "./IdOrderProduct";

export interface OrderProduct {
  id: IdOrderProduct,
  orders: IOrder,
  product: IProduct,
  quantity:number
}
