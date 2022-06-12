import Payment_method from "../payment_method";

export default class StripeCreditCard extends Payment_method {

  scripts() {
    return [
      'https://js.stripe.com/v3/'
    ];
  }

}
