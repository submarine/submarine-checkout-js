import { useContext, useState } from "preact/compat";
import classNames from "classnames";
import { SubmarineContext } from "./contexts";

export const UpsellButton = ({ submarine, selectedVariant, quantity }) => {
  const submarineContext = useContext(SubmarineContext);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState([]);

  const createUpsell = () => {
    setLoading(true);
    submarine.api.createUpsell(submarineContext.order.id, {
      variant_id: selectedVariant.id,
      quantity: quantity,
      notify_customer: false
    }, (result, errors) => {
      if(errors) {
        setErrors(errors);
        return;
      }

      setDisabled(true);
    });
  };

  const className = classNames({
    "btn": true,
    "btn--loading": loading,
    "btn-disabled": disabled
  });

  const payNowPrice = selectedVariant.price * quantity;

  return (
    <div>
      <button onClick={() => createUpsell()} className={className} disabled={disabled}>
        <span className="btn__content">
          Pay now - ${payNowPrice}
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
