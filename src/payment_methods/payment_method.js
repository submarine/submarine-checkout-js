export default class PaymentMethod {

  // initialise this payment method class
  constructor(paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  // return true if this payment method is available in the provided context
  isAvailable(submarineContext) {
    return true;
  }

  // return an array of external JS dependencies required for this payment method
  scripts() {
    return [];
  }

}
