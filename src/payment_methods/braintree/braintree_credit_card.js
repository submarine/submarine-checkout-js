import Payment_method from "../payment_method";

export default class BraintreeCreditCard extends Payment_method {

  scripts() {
    return [
      'https://js.braintreegateway.com/web/3.63.0/js/hosted-fields.min.js',
      'https://js.braintreegateway.com/web/3.63.0/js/client.min.js',
      'https://js.braintreegateway.com/web/3.63.0/js/data-collector.min.js'
    ];
  }

}
