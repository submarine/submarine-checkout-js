import DefaultFormWrapper from "./default/default_form";
import BraintreeCreditCardFormWrapper from "./braintree/braintree_credit_card_form_wrapper";

import DefaultForm from "./default/default_form";
import BraintreeCreditCardForm from "./braintree/braintree_credit_card_form";
import BraintreePaypalForm from "./braintree/braintree_paypal_form";
import StripeCreditCardForm from "./stripe/stripe_credit_card_form";

// a mapping between processors and payment method types to content wrapper components
const PAYMENT_METHOD_FORM_WRAPPERS = {
  "braintree": {
    "credit-card": BraintreeCreditCardFormWrapper
  }
};

// a mapping between processors and payment method types to content components
const PAYMENT_METHOD_FORMS = {
  "braintree": {
    "credit-card": BraintreeCreditCardForm,
    "paypal": BraintreePaypalForm,
  },
  "stripe": {
    "credit-card": StripeCreditCardForm
  }
};

// Given an initialised PaymentMethod class, return the appropriate component class for rendering the wrapper around
// the option's form. If no matching component class is defined, the DefaultFormWrapper is returned.
const getPaymentOptionFormWrapperComponent = (paymentMethod) => {
  if(PAYMENT_METHOD_FORM_WRAPPERS[paymentMethod.processor()] && PAYMENT_METHOD_FORM_WRAPPERS[paymentMethod.processor()][paymentMethod.type()]) {
    return PAYMENT_METHOD_FORM_WRAPPERS[paymentMethod.processor()][paymentMethod.type()];
  }

  return DefaultFormWrapper;
};

// Given an initialised PaymentMethod class, return the appropriate component for rendering the option's form content.
// If no specific component is defined, the DefaultForm component (which renders nothing) is returned.
const getPaymentOptionFormComponent = (paymentMethod) => {
  if(PAYMENT_METHOD_FORMS[paymentMethod.processor()] && PAYMENT_METHOD_FORMS[paymentMethod.processor()][paymentMethod.type()]) {
    return PAYMENT_METHOD_FORMS[paymentMethod.processor()][paymentMethod.type()];
  }

  return DefaultForm;
};

// Given an initialised PaymentMethod class, return the appropriate components for rendering both the option's form
// content and its wrapper.
export const getPaymentOptionFormComponents = (paymentMethod) => {
  return [getPaymentOptionFormWrapperComponent(paymentMethod), getPaymentOptionFormComponent(paymentMethod)];
};
