import { PaymentMethodTitle } from "./payment_method_title";

export const PaymentMethod = ({ paymentMethod, selectedPaymentMethod, canSelectPaymentMethod }) => {

  console.log('PaymentMethod', paymentMethod);

  return (
    <PaymentMethodTitle
      paymentMethod={paymentMethod}
      selectedPaymentMethod={selectedPaymentMethod}
      canSelectPaymentMethod={canSelectPaymentMethod}
    />
  );
};
