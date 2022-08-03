import React, { useCallback } from 'react';
import ProductItem from './ProductItem';
import { PRODUCTS } from './config';
import Cart from './Cart';
import Coupons from './Coupons';
import type { LineItem } from './types';

const ShoppingCart = () => {
  const [totalAmount, setTotalAmount] = React.useState(0);
  /**
   * @type {[LineItem[], Function]}
   */
  const [lineItems, setLineItems] = React.useState([]);
  /**
   * @type {[ProductItem[], Function]}
   */
  const [productItems, setProductItems] = React.useState(() =>
    PRODUCTS.map((item) => {
      return { ...item, isSoldOut: false };
    }),
  );

  // 結算總額
  React.useEffect(() => {
    const calcTotalAmount = lineItems.reduce((total, currentItem) => {
      return total + currentItem.price * currentItem.quantity;
    }, 0);
    setTotalAmount(calcTotalAmount);
  }, [lineItems]);

  // 增減數量
  const atUpdateQuantity = useCallback((id: string, num: number) => {
    const foundProduct = productItems.find((item) => item.id === id);
    if (foundProduct.inventory === 0) return;

    // 增減數量
    setLineItems((prev) => {
      return prev.map((item: LineItem) => {
        if (item.id === id) {
          return {
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity + num,
            inventory: item.inventory - num,
            isSoldOut: item.inventory - num === 0,
          };
        }
        return item;
      });
    });

    // 增減庫存
    setProductItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            inventory: item.inventory - num,
            isSoldOut: item.inventory - num === 0,
          };
        }
        return item;
      });
    });
  }, []);

  // 加入購物車
  const atAddToCart = useCallback(
    (id: string) => {
      const foundItem = lineItems.find((data) => data.id === id);
      if (foundItem) {
        atUpdateQuantity(id, 1);
      } else {
        // 新增
        const foundProduct = productItems.find((data) => data.id === id);
        const lineItem = {
          id,
          price: foundProduct.price,
          title: foundProduct.title,
          quantity: 1,
          inventory: foundProduct.inventory - 1,
          isSoldOut: foundProduct.inventory - 1 === 0,
        };
        setLineItems((prev) => prev.concat(lineItem));

        // 減少庫存
        setProductItems((prev) => {
          return prev.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                inventory: item.inventory - 1,
                isSoldOut: item.inventory - 1 === 0,
              };
            }
            return item;
          });
        });
      }
    },
    [atUpdateQuantity, lineItems],
  );

  const onRemoveItem = useCallback((id: string, quantity: number) => {
    setLineItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
    setProductItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            inventory: item.inventory + quantity,
            isSoldOut: item.inventory + quantity === 0,
          };
        }
        return item;
      }),
    );
  }, []);

  const onRemoveCart = useCallback(() => {
    setLineItems([]);
    setProductItems(() =>
      PRODUCTS.map((item) => {
        return { ...item, isSoldOut: false };
      }),
    );
  }, []);

  const listItems = productItems.map((product) => {
    return (
      <div className="col-3" key={product.id}>
        <ProductItem
          id={product.id}
          img={product.img}
          title={product.title}
          price={product.price}
          inventory={product.inventory}
          isSoldOut={product.isSoldOut}
          onAddToCart={atAddToCart}
        />
      </div>
    );
  });

  const atApplyCoupon = useCallback(
    (discount: number) => {
      const calcTotalAmount = lineItems.reduce((total, currentItem) => {
        return total + currentItem.price * currentItem.quantity;
      }, 0);
      setTotalAmount(calcTotalAmount - discount);
    },
    [lineItems],
  );

  return (
    <div className="container">
      <div className="row">{listItems}</div>
      <Cart
        totalAmount={totalAmount}
        lineItems={lineItems}
        onRemoveCart={onRemoveCart}
        onUpdateQuantity={atUpdateQuantity}
        onRemoveItem={onRemoveItem}
      />
      <Coupons onApplyCoupon={atApplyCoupon} />
    </div>
  );
};

export default ShoppingCart;
