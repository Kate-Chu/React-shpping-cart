import type { Product } from './types';

// TODO 1
export const PRODUCTS: Product[] = [
  {
    id: '1',
    img: 'images/pic01.jpg',
    title: '拍拍',
    price: 20,
    inventory: 5,
  },
  {
    id: '2',
    img: 'images/pic02.jpg',
    title: '花花',
    price: 15,
    inventory: 4,
  },
  {
    id: '3',
    img: 'images/pic03.jpg',
    title: '錢錢',
    price: 10,
    inventory: 3,
  },
  {
    id: '4',
    img: 'images/pic04.jpg',
    title: 'Money',
    price: 30,
    inventory: 1,
  },
];

export const coupons = [
  {
    id: 'coupon1',
    discount: 10,
  },
  {
    id: 'coupon2',
    discount: 5,
  },
];
