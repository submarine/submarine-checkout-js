import { PaymentOption } from "./payment_option";

export const PaymentOptions = ({ submarine, paymentMethods, selectedPaymentMethod, setSelectedPaymentMethod }) => {
  const canSelectPaymentMethod = paymentMethods.length > 1;

  return (
    <div className="content-box">
      {paymentMethods.map(paymentMethod => {
        return (
          <PaymentOption
            submarine={submarine}
            paymentMethod={paymentMethod}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            canSelectPaymentMethod={canSelectPaymentMethod}
          />
        );
      })}
    </div>
  );
};
