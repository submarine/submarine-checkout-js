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
    return new Promise((resolve, reject) => {
      submarine.api.generatePaymentProcessorClientToken('braintree', (clientToken, errors) => {
        if(errors) {
          reject(errors);
          return;
        }

        braintree.client.create({
          authorization: clientToken.token
        })
        .then(clientInstance => {
          const hostedFieldsOptions = getHostedFieldsOptions(clientInstance, submarineContext);
          braintree.hostedFields.create(
            hostedFieldsOptions
          )
          .then(hostedFieldsInstance => {
            // store a reference to the hosted fields instance for later use
            this.hostedFieldsInstance = hostedFieldsInstance;

            // resolve successfully
            resolve();
          })
          .catch(error => {
            reject(error);
          });
        })
        .catch(error => {
          reject(error);
        });
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  // validate hosted fields
  validate() {
    const state = this.hostedFieldsInstance.getState();

    const validationErrors = Object.entries(state.fields)
      .filter(([fieldName, field]) => !field.isValid)
      .map(([fieldName, field]) => {
        return {
          name: fieldName,
          error: 'invalid'
        }
      });

    // before returning, we focus the first invalid field if present
    if(validationErrors.length > 0) {
      this.hostedFieldsInstance.focus(validationErrors[0].name);
    }

    return validationErrors;
  }

}
