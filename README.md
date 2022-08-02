
## ShoppingCart
1. 為 config.js 設計 types.js
2. App.jsx totalAmount, lineItems state
3. ProductItem.jsx
4. App.jsx for loop render ProductItem
5. App.jsx atAddToCart
  > addToCart 會有二種行為，
  - Cart 已有商品，數量加 1，
  - 沒有的話才新增進 Cart
6. App.js 當 lineItems 有更動，計算 totalAmount
7. Cart.jsx 與 CartLineItem.jsx
## FIXED issue
- ProductItem
  - quantity 的數量要隨購物車數量減少
  - 如果賣完，文字換成 Sold out，同時不能點擊
- 購物車數量減少鈕按行為不正確。
- 請實作 Coupon 功能
  - 一次只能 apply 一個 coupon