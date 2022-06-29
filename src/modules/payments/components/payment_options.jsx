import { PaymentOption } from "./payment_option";

export const PaymentOptions = ({ submarine, paymentMethods, selectedPaymentMethod, validationErrors, setSelectedPaymentMethod }) => {
  const canSelectPaymentMethod = paymentMethods.length > 1;

  return (
    <div className="content-box">
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
