import { useState } from "preact/compat";
import { UpsellForm } from "./upsell_form";
import { formatAmount } from "../../../lib/helpers";

export const Upsell = ({ submarine, upsell }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
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
        {selectedVariant.upsellDiscount > 0 &&
          <p>
            <del>{formatAmount(selectedVariant.price)}</del> <span>{selectedVariant.upsellDiscount}% off</span>
          </p>
        }
        <p>
          <strong>{formatAmount(selectedVariant.upsellPrice)}</strong>
        </p>
      </div>

      <div className="submarine-upsells--form-wrapper">
        <UpsellForm
          submarine={submarine}
          upsell={upsell}
          selectedVariant={selectedVariant}
          setSelectedVariantIndex={setSelectedVariantIndex}
        />
      </div>
    </div>
  );
};
