import { useState } from "preact/compat";
import { UpsellButton } from "./upsell_button";

export const Upsell = ({ submarine, upsell }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

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
          <input
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            placeholder="Quantity"
            className="field__input field__in"
            aria-required="true"
            type="number"
            value="1"
            name=""
          />
        </div>
      </div>
    </div>
  );

  const selectedVariant = upsell.variants[selectedVariantIndex];

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
        <UpsellButton
          submarine={submarine}
          selectedVariant={selectedVariant}
          quantity={quantity}
        />
      </div>
    </div>
  );
};
