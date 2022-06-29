export default class PaymentMethod {

  // initialise this payment method class
  constructor(paymentMethodData) {
    this.paymentMethodData = paymentMethodData;
  }

  // return true if this payment method is available in the provided context
  isAvailable(submarineContext) {
    return true;
  }

  // return the payment method id
  id() {
    return this.paymentMethodData.id;
  }

  // return the processor
  processor() {
    return this.paymentMethodData.payment_processor;
  }

  // return the payment method type
  type() {
    return this.paymentMethodData.payment_method_type;
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
  // this method must return a Promise object which resolves on success or rejects on error
  setup({ submarine, submarineContext }) {}

}
