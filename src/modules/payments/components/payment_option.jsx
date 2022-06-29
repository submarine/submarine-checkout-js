import { Fragment } from "preact";
import { useContext, useEffect, useState } from "preact/compat";
import { SubmarineContext } from "../../common/contexts";

import { PaymentOptionTitle } from "./payment_option_title/payment_option_title";
import { getPaymentOptionFormComponents } from "./payment_option_form/initialise";

export const PaymentOption = ({ submarine, paymentMethod, selectedPaymentMethod, validationErrors, setSelectedPaymentMethod, canSelectPaymentMethod }) => {
  const isCurrentlySelectedPaymentMethod = (selectedPaymentMethod !== null) && (paymentMethod.id() === selectedPaymentMethod.id());
  const [loading, setLoading] = useState(true);

  const submarineContext = useContext(SubmarineContext);

  // initialise the payment method underlying this payment option
  useEffect(() => {
    paymentMethod.setup({ submarine, submarineContext }).then(() => {
      setLoading(false);
    });
  }, [paymentMethod]);

  // get the appropriate payment option form components for this payment method
  const [PaymentOptionFormWrapper, PaymentOptionForm] = getPaymentOptionFormComponents(paymentMethod);

  return (
    <Fragment>
      <PaymentOptionTitle
        paymentMethod={paymentMethod}
        isCurrentlySelectedPaymentMethod={isCurrentlySelectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        canSelectPaymentMethod={canSelectPaymentMethod}
      />
      <PaymentOptionFormWrapper isCurrentlySelectedPaymentMethod={isCurrentlySelectedPaymentMethod} loading={loading}>
        <PaymentOptionForm
          paymentMethod={paymentMethod}
          validationErrors={validationErrors}
          loading={loading}
        />
      </PaymentOptionFormWrapper>
    </Fragment>
  );
};
