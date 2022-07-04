import classNames from "classnames";
import { useContext, useState } from "preact/compat";
import { Upsell } from "./upsell";
import { getOrderAttribute } from "../../../lib/helpers";
import { ATTRIBUTE_PRESENTMENT_TOTAL_PRICE, ATTRIBUTE_PRESENTMENT_TOTAL_PRICE_LEGACY } from "../../../lib/constants";
import { SubmarineContext } from "../../common/contexts";

export const Upsells = ({ submarine, upsells }) => {
  const submarineContext = useContext(SubmarineContext);
  const [open, setOpen] = useState(true);

  if(upsells.length === 0) {
    return null;
  }

  const toggle = () => {
    setOpen(!open);
  };

  // calculate the exchange rate to display prices
  const shopTotalPrice = submarineContext.order.totalPrice;
  const presentmentTotalPrice = parseInt(getOrderAttribute(submarineContext, ATTRIBUTE_PRESENTMENT_TOTAL_PRICE_LEGACY) || getOrderAttribute(submarineContext, ATTRIBUTE_PRESENTMENT_TOTAL_PRICE));
  const exchangeRate = presentmentTotalPrice / shopTotalPrice;
  const taxRate = (submarineContext.order.taxLines || []).reduce((sum, taxLine) => sum + taxLine.rate, 0);

  const className = classNames({
    'notice notice-info default-background': true,
    'notice--collapsed': !open
  });

  return (
    <div className="section__content">
      <div className={className}>
        <svg className="icon-svg icon-svg--size-24 notice__icon" aria-hidden="true" focusable="false">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 11h1v7h-2v-5c-.552 0-1-.448-1-1s.448-1 1-1h1zm0 13C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM10.5 7.5c0-.828.666-1.5 1.5-1.5.828 0 1.5.666 1.5 1.5 0 .828-.666 1.5-1.5 1.5-.828 0-1.5-.666-1.5-1.5z"/></svg>
        </svg>
        <div className="notice__content">
          <h3 className="notice__title heading-3">You've unlocked some special offers!</h3>
          <p>
            Before you go, add a complementary item to your order.
          </p>
          <div className="notice__complementary" role="complementary" aria-expanded="true">
            <table className="product-table product-table--loose product-table--bordered">
              <thead className="product-table__header">
                <tr>
                  <th scope="col" className="visually-hidden">Product image</th>
                  <th scope="col" className="visually-hidden">Offer description</th>
                  <th scope="col" className="visually-hidden">Action</th>
                </tr>
              </thead>
              <tbody>
                {upsells.map(upsell => {
                  return (
                    <Upsell
                      submarine={submarine}
                      upsell={upsell}
                      exchangeRate={exchangeRate}
                      taxRate={taxRate}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <button name="button" type="button" className="notice__controls shown-if-js" aria-label="View more" data-banner-collapse="true" onClick={() => toggle()}>
          <svg className="icon-svg icon-svg--rotate-180 icon-svg--size-12 icon-svg--block" aria-hidden="true" focusable="false">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6"><path d="M9 0l1 1-4 4-1 1-1-1-4-4 1-1 4 4"/></svg>
          </svg>
        </button>
      </div>
    </div>
  );
};
