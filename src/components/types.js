// TODO 1

export type Product = {
  id: string,
  img: string,
  title: string,
  price: number,
  inventory: number,
};

export type LineItem = {
  id: string,
  price: string,
  title: string,
  quantity: number,
};

export type Coupon = {
  id: string,
  discount: number,
};
