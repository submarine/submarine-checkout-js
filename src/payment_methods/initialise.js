import Payment_method from "./payment_method";
import BraintreeCreditCard from "./braintree/braintree_credit_card";
import BraintreePayPal from "./braintree/braintree_paypal";
import StripeCreditCard from "./stripe/stripe_credit_card";

const PAYMENT_METHODS = {
  "braintree": {
    "credit-card": BraintreeCreditCard,
    "paypal": BraintreePayPal,
  },
  "stripe": {
    "credit-card": StripeCreditCard
  }
};

const getPaymentMethodClass = paymentMethod => {
  if(PAYMENT_METHODS[paymentMethod.payment_processor] && PAYMENT_METHODS[paymentMethod.payment_processor][paymentMethod.payment_method_type]) {
    return PAYMENT_METHODS[paymentMethod.payment_processor][paymentMethod.payment_method_type];
  }

  return Payment_method;
};

export const initialisePaymentMethod = (paymentMethod) => {
  const PaymentMethodClass = getPaymentMethodClass(paymentMethod);

  return new PaymentMethodClass(paymentMethod);
};
