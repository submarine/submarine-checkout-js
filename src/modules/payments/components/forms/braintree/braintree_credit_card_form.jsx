import CreditCardNumberTooltip from "../common/credit_card_number_tooltip";
import CreditCardVerificationValueTooltip from "../common/credit_card_verification_value_tooltip";
import { useContext } from "preact/compat";
import { SubmarineContext } from "../../contexts";

const BraintreeCreditCardForm = () => {
  const submarineContext = useContext(SubmarineContext);

  return (
    <div className="fieldset">
      <div className="field field--required">
        <div className="field__input-wrapper field__input-wrapper--icon-right" data-google-places="false">
          <label className="field__label field__label--visible" htmlFor="checkout_credit_card_number">
            {submarineContext.translations.payment_methods.braintree["credit-card"].number}
          </label>
          <div id="braintree-credit-card-card-number" className="field__input" />
          <CreditCardNumberTooltip />
        </div>
      </div>

      <div className="field field--required">
        <div className="field__input-wrapper">
          <label className="field__label field__label--visible" htmlFor="checkout_credit_card_name">
            {submarineContext.translations.payment_methods.braintree["credit-card"].name}
          </label>
          <input type="text" placeholder="Name on card" className="field__input" />
        </div>
      </div>

      <div className="field--half field field--required" data-credit-card-expiry="true" data-google-places="false">
        <div className="field__input-wrapper" data-google-places="false">
          <label className="field__label field__label--visible" htmlFor="checkout_credit_card_expiry">
            {submarineContext.translations.payment_methods.braintree["credit-card"].expiry}
          </label>
          <div id="braintree-credit-card-expiration-date" className="field__input" />
        </div>
      </div>

      <div className="field--half field field--required">
        <div className="field__input-wrapper field__input-wrapper--icon-right">
          <label className="field__label field__label--visible" htmlFor="checkout_credit_card_verification_value">
            {submarineContext.translations.payment_methods.braintree["credit-card"].cvv}
          </label>
          <div id="braintree-credit-card-cvv" className="field__input" />
          <CreditCardVerificationValueTooltip />
        </div>
      </div>
    </div>
  );
};

export default BraintreeCreditCardForm;
