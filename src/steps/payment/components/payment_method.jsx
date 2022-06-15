import { Fragment } from "react";
import { PaymentMethodTitle } from "./payment_method_title";
import { PaymentMethodForm } from "./payment_method_form";

export const PaymentMethod = ({ paymentMethod, selectedPaymentMethod, setSelectedPaymentMethod, canSelectPaymentMethod }) => {
  const isCurrentlySelectedPaymentMethod = (selectedPaymentMethod !== null) && (paymentMethod.id() === selectedPaymentMethod.id());

  return (
    <Fragment>
      <PaymentMethodTitle
        paymentMethod={paymentMethod}
        isCurrentlySelectedPaymentMethod={isCurrentlySelectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        canSelectPaymentMethod={canSelectPaymentMethod}
      />
      <PaymentMethodForm
        paymentMethod={paymentMethod}
        isCurrentlySelectedPaymentMethod={isCurrentlySelectedPaymentMethod}
      />
    </Fragment>
  );
};
