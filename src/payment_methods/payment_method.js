export default class PaymentMethod {

  // initialise this payment method class
  constructor(paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  // return true if this payment method is available in the provided context
  isAvailable(submarineContext) {
    return true;
  }

  // return the payment method id
  id() {
    return this.paymentMethod.id;
  }

  // return the processor
  processor() {
    return this.paymentMethod.payment_processor;
  }

  // return the payment method type
  type() {
    return this.paymentMethod.payment_method_type;
  }

  // return the icons to display for this payment method type
  icons() {
    return [];
  }

  // return an array of external JS dependencies required for this payment method
  scripts() {
    return [];
  }

  // set up this payment method
  setup({ submarine, submarineContext }) {}

}
