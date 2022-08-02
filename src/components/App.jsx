import React, { useCallback } from 'react';
import ProductItem from './ProductItem';
import { PRODUCTS } from './config';
import Cart from './Cart';
import Coupons from './Coupons';
import type { LineItem } from './types';

const ShoppingCart = () => {
  // TODO 2
  const [totalAmount, setTotalAmount] = React.useState(0);
  /**
   * @type {[LineItem[], Function]}
   */
  const [lineItems, setLineItems] = React.useState([]);

  // TODO 6
  React.useEffect(() => {
    const calcTotalAmount = lineItems.reduce((total, currentItem) => {
      return total + currentItem.price * currentItem.quantity;
    }, 0);
    setTotalAmount(calcTotalAmount);
  }, [lineItems]);

  // TODO 5
  const atUpdateQuantity = useCallback((id: string) => {
    // 增加數量
    setLineItems((prev) => {
      return prev.map((item: LineItem) => {
        if (item.id === id) {
          return {
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    });
  }, []);

  // TODO 5
  const atAddToCart = useCallback(
    (id: string) => {
      const foundItem = lineItems.find((data) => data.id === id);
      if (foundItem) {
        atUpdateQuantity(id);
      } else {
        // 新增
        const foundProduct = PRODUCTS.find((data) => data.id === id);

        const lineItem = {
          id,
          price: foundProduct.price,
          title: foundProduct.title,
          quantity: 1,
        };
        setLineItems((prev) => prev.concat(lineItem));
      }
    },
    [atUpdateQuantity, lineItems],
  );

  // TODO
  const onRemoveItem = useCallback((id: string) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // TODO
  const onRemoveCart = useCallback(() => {
    setLineItems([]);
  }, []);

  // FIXME 請實作 coupon
  /*
  const atApplyCoupon = useCallback((coupon) => {
    console.log('coupon', coupon);
  }, []);
  */

  return (
    <div className="container">
      <div className="row">
        {/* TODO 4 */}
        {PRODUCTS.map((product) => {
          return (
            <div className="col-3" key={product.id}>
              <ProductItem
                id={product.id}
                img={product.img}
                title={product.title}
                price={product.price}
                inventory={product.inventory}
                // TODO 5
                onAddToCart={atAddToCart}
              />
            </div>
          );
        })}
      </div>
      <Cart
        totalAmount={totalAmount}
        lineItems={lineItems}
        onRemoveCart={onRemoveCart}
        onUpdateQuantity={atUpdateQuantity}
        onRemoveItem={onRemoveItem}
      />
      {/* FIXME 請實作 coupon 功能 */}
      {/* <Coupons onApplyCoupon={atApplyCoupon} />} */}
    </div>
  );
};

export default ShoppingCart;
