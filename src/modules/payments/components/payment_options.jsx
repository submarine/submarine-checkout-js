import { PaymentOption } from "./payment_option";
import { useContext } from "preact/compat";
import { SubmarineConfig } from "../../common/contexts";

export const PaymentOptions = ({ submarine, paymentMethods, selectedPaymentMethod, validationErrors, setSelectedPaymentMethod }) => {
  const submarineConfig = useContext(SubmarineConfig);
  const canSelectPaymentMethod = paymentMethods.length > 1;

  // if a Submarine payment method is selected, render a hidden gateway input with the gateway id
  let gatewayHiddenInput = null;
  if(selectedPaymentMethod) {
    gatewayHiddenInput = (
      <input
        id={`checkout_payment_gateway_${submarineConfig.gateway.id}`}
        value={submarineConfig.gateway.id}
        type="hidden"
        name="checkout[payment_gateway]"
      />
    );
  }

  return (
    <div className="content-box">
      {gatewayHiddenInput}
      {paymentMethods.map(paymentMethod => {
        return (
          <PaymentOption
            submarine={submarine}
            paymentMethod={paymentMethod}
            selectedPaymentMethod={selectedPaymentMethod}
            validationErrors={validationErrors}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            canSelectPaymentMethod={canSelectPaymentMethod}
          />
        );
      })}
    </div>
  );
};
