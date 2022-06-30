import classNames from "classnames";
import CreditCardNumberTooltip from "../common/credit_card_number_tooltip";
import CreditCardVerificationValueTooltip from "../common/credit_card_verification_value_tooltip";
import { useContext } from "preact/compat";
import { SubmarineContext } from "../../../../common/contexts";
import { Fragment } from "preact";
import ErrorMessage from "../common/error_message";
import { t } from "../../../../../lib/helpers";

const BraintreeCreditCardForm = ({ validationErrors, loading, setAdditionalData }) => {
  const submarineContext = useContext(SubmarineContext);

  // convert any validation errors to a translated list of messages
  const errors = validationErrors.map(validationError => {
    return t(`payment_methods.braintree.credit-card.errors.${validationError.name}.${validationError.error}`, submarineContext.translations);
  });

  // input class names change as elements render
  const inputClassName = classNames({
    'field__input': true,
    'field__input--iframe-container': loading
  });

  // the name element is not managed by Braintree, so we render it conditionally based on load state
  let nameElement = <div id="braintree-credit-card-name" className="field__input field__input--iframe-container" />;
  if(!loading) {
    nameElement = (
      <input
        type="text"
        placeholder="Name on card"
        className="field__input"
        onChange={e => setAdditionalData({ cardholderName: e.target.value })}
      />
    );
  }

  return (
    <Fragment>
      <div className="fieldset">
        <div className="field field--required">
          <div className="field__input-wrapper field__input-wrapper--icon-right" data-google-places="false">
            <label className="field__label field__label--visible" htmlFor="checkout_credit_card_number">
              {t('payment_methods.braintree.credit-card.number', submarineContext.translations)}
            </label>
            <div id="braintree-credit-card-card-number" className={inputClassName} />
            <CreditCardNumberTooltip />
          </div>
        </div>

        <div className="field field--required">
          <div className="field__input-wrapper">
            <label className="field__label field__label--visible" htmlFor="checkout_credit_card_name">
              {t('payment_methods.braintree.credit-card.name', submarineContext.translations)}
            </label>
            {nameElement}
          </div>
        </div>

        <div className="field--half field field--required" data-credit-card-expiry="true" data-google-places="false">
          <div className="field__input-wrapper" data-google-places="false">
            <label className="field__label field__label--visible" htmlFor="checkout_credit_card_expiry">
              {t('payment_methods.braintree.credit-card.expiry', submarineContext.translations)}
            </label>
            <div id="braintree-credit-card-expiration-date" className={inputClassName} />
          </div>
        </div>

        <div className="field--half field field--required">
          <div className="field__input-wrapper field__input-wrapper--icon-right">
            <label className="field__label field__label--visible" htmlFor="checkout_credit_card_verification_value">
              {t('payment_methods.braintree.credit-card.cvv', submarineContext.translations)}
            </label>
            <div id="braintree-credit-card-cvv" className={inputClassName} />
            <CreditCardVerificationValueTooltip />
          </div>
        </div>
        <style>{"\
          #braintree-hosted-field-number, #braintree-hosted-field-expirationDate, #braintree-hosted-field-cvv {\
            height: 18px !important;\
          "}
        </style>
      </div>
      <ErrorMessage
        errors={errors}
      />
    </Fragment>
  );
};

export default BraintreeCreditCardForm;
