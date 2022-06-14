import { useContext } from "preact/compat";
import { SubmarineConfig, SubmarineContext } from "./contexts";
import { PaymentMethodTitleInput } from "./payment_method_title_input";
import { PaymentMethodTitleIcon } from "./payment_method_title_icon";

export const PaymentMethodTitle = ({ paymentMethod, selectedPaymentMethod, setSelectedPaymentMethod, canSelectPaymentMethod }) => {
  const submarineConfig = useContext(SubmarineConfig);
  const submarineContext = useContext(SubmarineContext);
  const isCurrentlySelectedPaymentMethod = (selectedPaymentMethod !== null) && (paymentMethod.id() === selectedPaymentMethod.id());

  return (
    <div className="radio-wrapper content-box__row" data-gateway-group="offsite" data-gateway-name="offsite" data-select-gateway={submarineConfig.gateway.id}>
      <PaymentMethodTitleInput
        paymentMethod={paymentMethod}
        isCurrentlySelectedPaymentMethod={isCurrentlySelectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        canSelectPaymentMethod={canSelectPaymentMethod}
      />

      <div className={`radio__label ${canSelectPaymentMethod ? 'content-box__emphasis' : 'radio__label--inactive'}`}>
        <label className="radio__label__primary content-box__emphasis" htmlFor={`checkout_payment_method_shop_${paymentMethod.id()}`}>
          {submarineContext.translations.payment_methods[paymentMethod.processor()][paymentMethod.type()].title}
        </label>
        <div className="radio__label__accessory">
          <h3 className="visually-hidden">
            {` ${submarineContext.translations.payment_methods.common.pay_with} `}
          </h3>

          <span data-brand-icons-for-gateway={submarineConfig.gateway.id}>
            {paymentMethod.icons().map(icon => {
              return (
                <PaymentMethodTitleIcon
                  icon={icon}
                  label={submarineContext.translations.payment_methods.common.icons[icon]}
                />
              );
            })}
          </span>
        </div>
      </div>

      <div id={`payment_gateway_${submarineConfig.gateway.id}_description`} className="visually-hidden" aria-live="polite" data-detected="Detected card brand: {brand}" />
    </div>
  );
};
