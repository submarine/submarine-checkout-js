import PaymentMethod from "../payment_method";
import { ICON_AMEX, ICON_MASTERCARD, ICON_VISA } from "../../constants";

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

}
