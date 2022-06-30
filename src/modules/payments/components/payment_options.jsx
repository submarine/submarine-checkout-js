import { PaymentOption } from "./payment_option";
import { useContext } from "preact/compat";
import { SubmarineConfig, SubmarineContext } from "../../common/contexts";
import { Fragment } from "preact";
import {
  ATTRIBUTE_PRESENTMENT_AMOUNT,
  ATTRIBUTE_PRESENTMENT_CURRENCY,
  ATTRIBUTE_PRESENTMENT_TOTAL_PRICE
} from "../../../lib/constants";

export const PaymentOptions = ({ submarine, paymentMethods, selectedPaymentMethod, validationErrors, setAdditionalData, setSelectedPaymentMethod }) => {
  const submarineConfig = useContext(SubmarineConfig);
  const submarineContext = useContext(SubmarineContext);
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

  // if the checkout currency is different to the store currency, render hidden inputs with presentment information
  // these attributes allow the correct display of currency information on the thankyou page immediately after checkout
  let presentmentHiddenInputs = null;
  if(submarineContext.shop.currency !== submarineContext.checkout.currency) {
    presentmentHiddenInputs = (
      <Fragment>
        <input type="hidden" name={`checkout[attributes][${ATTRIBUTE_PRESENTMENT_AMOUNT}]`} value={submarineContext.checkout.totalPriceFormatted} />
        <input type="hidden" name={`checkout[attributes][${ATTRIBUTE_PRESENTMENT_CURRENCY}]`} value={submarineContext.checkout.currency} />
        <input type="hidden" name={`checkout[attributes][${ATTRIBUTE_PRESENTMENT_TOTAL_PRICE}]`} value={submarineContext.checkout.totalPrice} />
      </Fragment>
    );
  }

  return (
    <div className="content-box">
      {gatewayHiddenInput}
      {presentmentHiddenInputs}
      {paymentMethods.map(paymentMethod => {
        return (
          <PaymentOption
            submarine={submarine}
            paymentMethod={paymentMethod}
            selectedPaymentMethod={selectedPaymentMethod}
            validationErrors={validationErrors}
            setAdditionalData={setAdditionalData}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            canSelectPaymentMethod={canSelectPaymentMethod}
          />
        );
      })}
    </div>
  );
};
