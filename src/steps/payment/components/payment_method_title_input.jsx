import { useContext } from "preact/compat";
import { SubmarineConfig } from "./contexts";

export const PaymentMethodTitleInput = ({ paymentMethod, isCurrentlySelectedPaymentMethod, canSelectPaymentMethod }) => {
  const submarineConfig = useContext(SubmarineConfig);

  // if we can't select a payment method, simply return a hidden input
  if(!canSelectPaymentMethod) {
    return (
      <input
        value={submarineConfig.gateway.id}
        autoComplete="off"
        size="30"
        type="hidden"
        name="checkout[payment_gateway]"
      />
    );
  }

  // otherwise, return a radio select input
  return (
    <div className="radio__input">
      <input
        className="input-radio"
        id={`checkout_payment_method_shop_${paymentMethod.id}`}
        type="radio"
        value={`shop_payment_method_${paymentMethod.id}`}
        name="checkout[attributes][_payment_method]"
        checked={isCurrentlySelectedPaymentMethod}
      />
    </div>
  );
};
