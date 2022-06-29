import { useContext, useState } from "preact/compat";
import classNames from "classnames";
import { SubmarineContext } from "./contexts";
import { formatAmount } from "../../../lib/helpers";

export const UpsellForm = ({ submarine, upsell, selectedVariant, setSelectedVariantIndex }) => {
  const submarineContext = useContext(SubmarineContext);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [errors, setErrors] = useState([]);

  const payNowPrice = selectedVariant.price * parseInt(quantity);

  if(added) {
    return (
      <p>
        added {quantity} to order for {formatAmount(payNowPrice)}
      </p>
    );
  }

  let variantSelector = null;
  if(upsell.variants.length > 1) {
    variantSelector = (
      <select onChange={e => setSelectedVariantIndex(e.target.value)}>
        {upsell.variants.map((variant, index) => {
          return <option key={variant.id} value={index}>{variant.title}</option>;
        })}
      </select>
    );
  }

  const quantitySelector = (
    <div className="fieldset">
      <div className="field field--required field--show-floating-label">
        <div className="field__input-wrapper">
          <label className="field__label field__label--visible">Quantity</label>
          <input
            onChange={e => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="field__input field__in"
            aria-required="true"
            type="number"
            min="1"
            value={quantity}
            name=""
          />
        </div>
      </div>
    </div>
  );

  const createUpsell = () => {
    setLoading(true);

    submarine.api.createUpsell(submarineContext.order.id, {
      variant_id: selectedVariant.id,
      quantity: quantity,
      notify_customer: false
    }, (result, errors) => {
      setLoading(false);

      if (errors) {
        setErrors(errors);
        return;
      }

      setAdded(true);
    });
  };

  const className = classNames({
    "btn": true,
    "btn--loading": loading
  });

  return (
    <div>
      {variantSelector}
      {quantitySelector}
      <button onClick={() => createUpsell()} className={className}>
        <span className="btn__content">
          Pay now - {formatAmount(payNowPrice)}
        </span>
        <svg className="icon-svg icon-svg--size-18 btn__spinner icon-svg--spinner-button" aria-hidden="true" focusable="false">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0v2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8h2z"/></svg>
        </svg>
      </button>
      {errors.map(error => {
        return <p>{error}</p>
      })}
    </div>
  );
};
