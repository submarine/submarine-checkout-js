import PaymentMethod from "../payment_method";
import { ICON_AMEX, ICON_MASTERCARD, ICON_VISA } from "../../constants";

const DEFAULT_HOSTED_FIELDS_OPTIONS = {
  styles: {
    input: {
      color: "#333333",
      "font-size": "14px",
      "font-family": '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif'
    },
    '::-webkit-input-placeholder': {
      color: '#737373'
    }
  }
};

const getHostedFieldsOptions = (clientInstance, submarineContext) => {
  return Object.assign({}, DEFAULT_HOSTED_FIELDS_OPTIONS, {
    client: clientInstance,
    fields: getCreditCardFields(submarineContext)
  });
};

const getCreditCardFields = (submarineContext) => {
  return {
    number: {
      selector: "#braintree-credit-card-card-number",
      placeholder: submarineContext.translations.payment_methods.braintree["credit-card"].number
    },
    expirationDate: {
      selector: "#braintree-credit-card-expiration-date",
      placeholder: submarineContext.translations.payment_methods.braintree["credit-card"].expiry
    },
    cvv: {
      selector: "#braintree-credit-card-cvv",
      placeholder: submarineContext.translations.payment_methods.braintree["credit-card"].cvv
    }
  };
};

export default class BraintreeCreditCard extends PaymentMethod {

  icons() {
    return [
      ICON_VISA,
      ICON_MASTERCARD,
      ICON_AMEX
    ];
  }

  scripts() {
    return [
      'https://js.braintreegateway.com/web/3.63.0/js/hosted-fields.min.js',
      'https://js.braintreegateway.com/web/3.63.0/js/client.min.js',
      'https://js.braintreegateway.com/web/3.63.0/js/data-collector.min.js'
    ];
  }

  // set up the braintree credit card payment method
  setup({ submarine, submarineContext }) {
    submarine.api.generatePaymentProcessorClientToken('braintree', clientToken => {
      braintree.client.create({
        authorization: clientToken.token
      })
      .then(clientInstance => {
        const hostedFieldsOptions = getHostedFieldsOptions(clientInstance, submarineContext);
        braintree.hostedFields.create(hostedFieldsOptions)
      })
      .then(hostedFieldsInstance => {
        // do nothing for now
      })
    });
  }

}
