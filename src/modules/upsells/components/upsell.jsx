import { useState } from "preact/compat";

export const Upsell = ({ upsell }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  let variantSelector = null;
  if(upsell.variants.length > 1) {
    variantSelector = (
      <select onChange={(e) => setSelectedVariantIndex(e.target.value)}>
        {upsell.variants.map((variant, index) => {
          return <option key={variant.id} value={index}>{variant.title}</option>;
        })}
      </select>
    );
  }

  let quantitySelector = null;
  quantitySelector = (
    <div className="fieldset">
      <div className="field field--required field--show-floating-label">
        <div className="field__input-wrapper">
          <label className="field__label field__label--visible">Quantity</label>
          <input placeholder="Quantity" className="field__input field__in" aria-required="true" type="number" value="1" name="" />
        </div>
      </div>
    </div>
  );

  const selectedVariant = upsell.variants[selectedVariantIndex];
  const price = selectedVariant.price * quantity;

  return (
    <div className="submarine-upsells--upsell">
      <div className="submarine-upsells--image-wrapper">
        <div className="submarine-upsells--image-wrapper--image">
          <img src={upsell.featured_image} alt={upsell.title} />
        </div>
      </div>

      <div className="submarine-upsells--price-wrapper">
        <h4>{upsell.title}</h4>
        <p>
          <del>{upsell.price}</del> <span>58%</span>
        </p>
        <p>
          <strong>{upsell.price}</strong>
        </p>
      </div>

      <div className="submarine-upsells--action-wrapper">
        {variantSelector}
        {quantitySelector}
        <button className="btn">
          <span className="btn__content">
            Pay now - ${price}
          </span>
          <svg className="icon-svg icon-svg--size-18 btn__spinner icon-svg--spinner-button" aria-hidden="true" focusable="false">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0v2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8h2z"/></svg>
          </svg>
        </button>
      </div>
    </div>
  );
};
