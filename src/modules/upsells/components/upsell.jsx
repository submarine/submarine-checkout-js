import { useState } from "preact/compat";
import { UpsellForm } from "./upsell_form";
import { calculatePrice, formatAmount } from "../../../lib/helpers";

export const Upsell = ({ submarine, upsell, exchangeRate, taxRate }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = upsell.variants[selectedVariantIndex];

  return (
    <tr className="product">
      <td className="product__image">
        <div className="product-thumbnail product-thumbnail--small">
          <div className="product-thumbnail__wrapper">
            <img
              alt={upsell.title}
              className="product-thumbnail__image"
              src={upsell.featured_image}
            />
          </div>
        </div>
      </td>
      <td className="product__description">
        <span className="product__description__name emphasis">
          {upsell.title}
        </span>
        {selectedVariant.upsellDiscount > 0 &&
          <span className="product__description__variant small-text">
            <del>{formatAmount(calculatePrice(selectedVariant.price, taxRate, selectedVariant.taxable, exchangeRate))}</del> ({selectedVariant.upsellDiscount}% off)
          </span>
        }
        <span className="product__description__variant small-text">
          {formatAmount(calculatePrice(selectedVariant.upsellPrice, taxRate, selectedVariant.taxable, exchangeRate))}
        </span>
      </td>
      <td className="product__status">
        <UpsellForm
          submarine={submarine}
          upsell={upsell}
          exchangeRate={exchangeRate}
          taxRate={taxRate}
          selectedVariant={selectedVariant}
          setSelectedVariantIndex={setSelectedVariantIndex}
        />
      </td>
    </tr>
  );
};
