export interface IOrderedProduct {
  productId: number;
  quantity: number;
}

export interface ICheckout {
  address: string;
  lastName: string;
  firstName: string;
  orderDetails: IOrderedProduct[];
}
