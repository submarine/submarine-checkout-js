import DefaultForm from "./default/default_form";
import BraintreeCreditCardForm from "./braintree/braintree_credit_card_form";
import BraintreePaypalForm from "./braintree/braintree_paypal_form";
import StripeCreditCardForm from "./stripe/stripe_credit_card_form";

const PAYMENT_METHOD_FORMS = {
  "braintree": {
    "credit-card": BraintreeCreditCardForm,
    "paypal": BraintreePaypalForm,
  },
  "stripe": {
    "credit-card": StripeCreditCardForm
  }
};

export const getPaymentMethodFormComponent = paymentMethod => {
  if(PAYMENT_METHOD_FORMS[paymentMethod.processor()] && PAYMENT_METHOD_FORMS[paymentMethod.processor()][paymentMethod.type()]) {
    return PAYMENT_METHOD_FORMS[paymentMethod.processor()][paymentMethod.type()];
  }

  return DefaultForm;
};
