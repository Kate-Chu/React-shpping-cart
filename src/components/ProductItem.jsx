import React from 'react';
import { Product } from './types';
// TODO 3
type ProductItemProps = Product & {
  onAddToCart(id: string): void,
};
const ProductItem: React.FC<ProductItemProps> = (props) => {
  // prettier-ignore
  const {
    id,
    img,
    title,
    price,
    inventory,
    isSoldOut,
    onAddToCart,
  } = props;

  return (
    <section className="card px-0" data-name="ProductItem">
      <img src={img} alt={title} />
      <div className="card-body">
        <div className="d-flex">
          <div>{title}</div>
          <div>${price}</div>
        </div>
        <small>
          Available quantity: <b>{isSoldOut ? 'Sold out' : inventory} </b>
        </small>
        {/* FIXME: 如果賣完，文字換成 Sold out，同時不能點擊 */}
        <button
          className="btn btn-sm btn-warning fw-light"
          onClick={() => {
            onAddToCart(id);
          }}
          disabled={isSoldOut}
        >
          Add
        </button>
      </div>
    </section>
  );
};
export default React.memo(ProductItem);
