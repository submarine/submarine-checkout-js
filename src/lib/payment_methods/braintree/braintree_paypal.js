import PaymentMethod from "../payment_method";
import { ICON_PAYPAL } from "../../constants";

const DEFAULT_CREATE_PAYMENT_OPTIONS = {
  flow: 'vault',
  intent: 'tokenize',
  enableShippingAddress: false,
  shippingAddressEditable: false
};

const getCreatePaymentOptions = (submarineContext) => {
  const createPaymentOptions = Object.assign({}, DEFAULT_CREATE_PAYMENT_OPTIONS, {
    billingAgreementDescription: submarineContext.translations.payment_methods.braintree.paypal.billingAgreementDescription
  });

  if (submarineContext.checkout && submarineContext.checkout.shippingAddress) {
    const shippingAddress = submarineContext.checkout.shippingAddress;

    createPaymentOptions.enableShippingAddress = true;
    createPaymentOptions.shippingAddressOverride = {
      recipientName: shippingAddress.name,
      line1: shippingAddress.address1,
      line2: shippingAddress.address2,
      city: shippingAddress.city,
      countryCode: shippingAddress.country_code,
      postalCode: shippingAddress.zip,
      state: shippingAddress.province_code,
      phone: shippingAddress.phone
    };
  }

  return createPaymentOptions;
};

export default class BraintreePayPal extends PaymentMethod {

  icons() {
    return [
      ICON_PAYPAL
    ]
  }

  scripts() {
    return [
      'https://js.braintreegateway.com/web/3.69.0/js/client.min.js',
      'https://js.braintreegateway.com/web/3.69.0/js/paypal-checkout.min.js',
      'https://js.braintreegateway.com/web/3.69.0/js/data-collector.min.js'
    ];
  }

  // set up the braintree paypal payment method
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

          // create a data collector instance and record data for later use
          braintree.dataCollector.create({
            client: clientInstance,
            paypal: true
          }).then(dataCollectorInstance => {
            // store a reference to the device data for later use
            this.deviceData = dataCollectorInstance.deviceData;
          });

          // create a paypal checkout instance
          braintree.paypalCheckout.create({
            client: clientInstance
          })
          .then(paypalCheckoutInstance => {
            this.paypalCheckoutInstance = paypalCheckoutInstance;

            paypalCheckoutInstance.loadPayPalSDK({
              vault: true,
              intent: 'tokenize'
            }, (error) => {
              if(error) {
                reject(error);
                return;
              }

              paypal.Buttons({
                fundingSource: paypal.FUNDING.PAYPAL,
                createBillingAgreement: () => {
                  const createPaymentOptions = getCreatePaymentOptions(submarineContext);
                  return paypalCheckoutInstance.createPayment(createPaymentOptions);
                },
                onApprove: (data) => {
                  this.approvedData = data;
                },
                onCancel: () => {
                  this.approvedData = null;
                },
                onError: () => {
                  this.approvedData = null;
                }
              }).render('#braintree-paypal-mount').then(() => {
                // resolve successfully
                resolve();
              });
            });
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

  // valid paypal account was approved
  validate() {
    const validationErrors = [];

    if(!this.approvedData) {
      validationErrors.push({
        name: 'agreement',
        error: 'missing'
      });
    }

    return validationErrors;
  }

  // tokenise
  process({ additionalData, submarineContext }) {
    return new Promise((resolve, reject) => {
      this.paypalCheckoutInstance.tokenizePayment(this.approvedData, (tokenizeError, payload) => {
        if(tokenizeError) {
          reject();
          return;
        }

        // build a response in the standardised format and resolve
        resolve(this.buildProcessResult(submarineContext, {
          payment_nonce: payload.nonce
        }));
      });
    });
  }

}
