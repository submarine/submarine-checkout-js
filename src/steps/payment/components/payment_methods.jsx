import { useState } from "preact/compat";
import { PaymentMethod } from "./payment_method";

export const PaymentMethods = ({ paymentMethods }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
  const canSelectPaymentMethod = paymentMethods.length > 1;

  return (
    <div className="content-box">
      {paymentMethods.map(paymentMethod => {
        return (
          <PaymentMethod
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
