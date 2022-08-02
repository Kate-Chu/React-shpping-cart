import React from 'react';

// TODO 7
type BuildItemProps = {
  id: string,
  title: string,
  quantity: number,
  price: number,
  onRemoveItem: (id: string) => void,
  onUpdateQuantity: (id: string) => void,
};

const BuildItem: React.FC<BuildItemProps> = (props) => {
  // prettier-ignore
  const {
    title,
    quantity,
    price,
    id,
    onRemoveItem,
    onUpdateQuantity,
  } = props;

  // 小計
  const lineItemPrice = price * quantity;
  return (
    <section className="row" data-name="CartLineItem" data-gradient>
      <div className="col-2">{title}</div>
      <div className="col-3">
        {/* FIXME：這裡有 bug，怎麼修好他呢? */}
        <button onClick={() => onUpdateQuantity(id, quantity - 1)}>-</button>
        <span className="px-1">{quantity}</span>
        <button onClick={() => onUpdateQuantity(id, quantity + 1)}>+</button>
      </div>

      <div className="col-2">{price}</div>
      <div className="col-3">{lineItemPrice}</div>
      <div className="col-2">
        <button className="btn btn-danger w-100" onClick={() => onRemoveItem(id)}>
          Remove
        </button>
      </div>
    </section>
  );
};

export default React.memo(BuildItem);
