import PaymentMethod from "../payment_method";
import { ICON_PAYPAL } from "../../constants";

export default class BraintreePayPal extends PaymentMethod {

  icons() {
    return [
      ICON_PAYPAL
    ]
  }

  scripts() {
    return [
      'https://js.braintreegateway.com/web/3.63.0/js/client.min.js',
      'https://js.braintreegateway.com/web/3.63.0/js/paypal-checkout.min.js',
      'https://js.braintreegateway.com/web/3.63.0/js/data-collector.min.js'
    ];
  }

}
