import { useState } from "preact/compat";

export const Upsell = ({ upsell, moveToNextUpsell }) => {
  if(!upsell) {
    return null;
  }

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = upsell.variants[selectedVariantIndex];

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

  return (
    <div>
      <h3>We have a special offer for you!</h3>
      <p>
        Add {upsell.title} to your next order and save!
      </p>

      <img src={upsell.featured_image} alt={upsell.title} />

      {variantSelector}

      <button onClick={() => moveToNextUpsell()}>Pay now - ${selectedVariant.price}</button>
      <button onClick={() => moveToNextUpsell()}>Decline this offer</button>

      <p>
        {upsell.description}
      </p>
    </div>
  );
};
