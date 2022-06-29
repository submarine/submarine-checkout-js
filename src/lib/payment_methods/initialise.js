import PaymentMethod from "./payment_method";
import BraintreeCreditCard from "./braintree/braintree_credit_card";
import BraintreePayPal from "./braintree/braintree_paypal";
import StripeCreditCard from "./stripe/stripe_credit_card";

// mappings from processor and type names to a PaymentMethod class
const PAYMENT_METHODS = {
  "braintree": {
    "credit-card": BraintreeCreditCard,
    "paypal": BraintreePayPal,
  },
  "stripe": {
    "credit-card": StripeCreditCard
  }
};

// given a raw payment method data object, return the appropriate PaymentMethod class
const getPaymentMethodClass = (paymentMethodData) => {
  if(PAYMENT_METHODS[paymentMethodData.payment_processor] && PAYMENT_METHODS[paymentMethodData.payment_processor][paymentMethodData.payment_method_type]) {
    return PAYMENT_METHODS[paymentMethodData.payment_processor][paymentMethodData.payment_method_type];
  }

  return PaymentMethod;
};

// given a raw payment method data object, return an instance of the appropriate PaymentMethod class
export const initialisePaymentMethod = (paymentMethodData) => {
  const PaymentMethodClass = getPaymentMethodClass(paymentMethodData);

  return new PaymentMethodClass(paymentMethodData);
};
