import { useContext, useState } from "preact/compat";
import classNames from "classnames";
import { SubmarineContext } from "../../common/contexts";
import { formatAmount } from "../../../lib/helpers";

export const UpsellForm = ({ submarine, upsell, exchangeRate, selectedVariant, setSelectedVariantIndex }) => {
  const submarineContext = useContext(SubmarineContext);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [errors, setErrors] = useState([]);

  const payNowPrice = selectedVariant.upsellPrice * parseInt(quantity);

  if(added) {
    return 'Added';
  }

  const createUpsell = () => {
    setLoading(true);

    submarine.api.createUpsell(submarineContext.order.id, {
      variant_id: selectedVariant.id,
      quantity: quantity,
      notify_customer: false
    }, (result, errors) => {
      if (errors) {
        setLoading(false);
        setErrors(errors);
        return;
      }

      // replace the sidebar, update dropdown, and payment information at the bottom of the page
      fetch(window.location.href)
        .then(response => response.text())
        .then(html => {
          const parsedDocument = new DOMParser().parseFromString(html, 'text/html');

          ['[data-order-summary]', '[data-banner="true"]', '.step__sections .section:last-child .section__content .content-box:last-child'].forEach(selector => {
            const sourceElement = parsedDocument.querySelector(selector);
            const targetElement = document.querySelector(selector);

            if(!sourceElement || !targetElement) {
              return;
            }

            targetElement.replaceWith(sourceElement);
          });

          document.dispatchEvent(new Event('page:change'));

          setLoading(false);
          setAdded(true);
        });
    });
  };

  const className = classNames({
    "btn btn--size-small": true,
    "btn--loading": loading
  });

  return (
    <button onClick={() => createUpsell()} className={className}>
      <span className="btn__content">
        Pay now - {formatAmount(payNowPrice * exchangeRate)}
      </span>
      <svg className="icon-svg icon-svg--size-18 btn__spinner icon-svg--spinner-button" aria-hidden="true" focusable="false">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0v2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8h2z"/></svg>
      </svg>
    </button>
  );
};
