import Payment_method from "../payment_method";
import { ICON_VISA, ICON_MASTERCARD, ICON_AMEX } from "../../constants";

export default class StripeCreditCard extends Payment_method {

  icons() {
    return [
      ICON_VISA,
      ICON_MASTERCARD,
      ICON_AMEX
    ];
  }

  scripts() {
    return [
      'https://js.stripe.com/v3/'
    ];
  }

}
