import { PaymentMethodTitle } from "./payment_method_title";

export const PaymentMethod = ({ paymentMethod, selectedPaymentMethod, setSelectedPaymentMethod, canSelectPaymentMethod }) => {
  return (
    <PaymentMethodTitle
      paymentMethod={paymentMethod}
      selectedPaymentMethod={selectedPaymentMethod}
      setSelectedPaymentMethod={setSelectedPaymentMethod}
      canSelectPaymentMethod={canSelectPaymentMethod}
    />
  );
};
