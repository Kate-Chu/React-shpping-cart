import React from 'react';

// TODO 7
type BuildItemProps = {
  id: string,
  title: string,
  quantity: number,
  price: number,
  isSoldOut: Boolean,
  onRemoveItem: (id: string) => void,
  onUpdateQuantity: (id: string, num: number) => void,
};

const BuildItem: React.FC<BuildItemProps> = (props) => {
  // prettier-ignore
  const {
    title,
    quantity,
    price,
    id,
    isSoldOut,
    onRemoveItem,
    onUpdateQuantity,
  } = props;

  // 小計
  const lineItemPrice = price * quantity;
  return (
    <section className="row" data-name="CartLineItem" data-gradient>
      <div className="col-2">{title}</div>
      <div className="col-3">
        <button onClick={() => onUpdateQuantity(id, -1)} disabled={quantity === 1}>
          -
        </button>
        <span className="px-1">{quantity}</span>
        <button onClick={() => onUpdateQuantity(id, 1)} disabled={isSoldOut}>
          +
        </button>
      </div>

      <div className="col-2">{price}</div>
      <div className="col-3">{lineItemPrice}</div>
      <div className="col-2">
        <button
          className="btn btn-danger w-100"
          onClick={() => onRemoveItem(id, quantity)}
        >
          Remove
        </button>
      </div>
    </section>
  );
};

export default React.memo(BuildItem);
