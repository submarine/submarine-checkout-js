import { useState } from "preact/compat";
import { Upsell } from "./upsell";

export const Upsells = ({ upsells }) => {
  const [open, setOpen] = useState(true);

  if(!open || (upsells.length === 0)) {
    return null;
  }

  const declineOffers = () => {
    setOpen(false);
  };

  return (
    <div className="submarine-upsells--container">
      <div className="submarine-upsells--escape-hatch">
        <svg focusable="false" aria-hidden="true" className="icon-svg icon-svg--size-24 os-header__hanging-icon--smaller" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm3.784-13.198c.386-.396 1.02-.404 1.414-.018.396.386.404 1.02.018 1.414l-5.85 6c-.392.403-1.04.403-1.432 0l-3.15-3.23c-.386-.396-.378-1.03.018-1.415.395-.385 1.028-.377 1.414.018l2.434 2.5 5.134-5.267z"></path>
        </svg>
        <h4>You've paid for your order.</h4>
        <p>
          <button onClick={() => declineOffers()}>
            View order confirmation ›
          </button>
        </p>
      </div>

      <div className="submarine-upsells--banner">
        <h3>You've unlocked a special offer - save up to 58%!</h3>
        <p>
          Before you go, add a complementary item to your order.
        </p>
      </div>

      <div className="submarine-upsells--upsells">
        {upsells.map(upsell => {
          return (
            <Upsell
              upsell={upsell}
            />
          )
        })}
      </div>

      <div className="submarine-upsells--footer">
        <p>
          Not interested?
        </p>
        <button onClick={() => declineOffers()}>
          Decline offers
        </button>
      </div>
    </div>
  );
};
