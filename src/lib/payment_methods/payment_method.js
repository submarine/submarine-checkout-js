export default class PaymentMethod {

  // Initialise this payment method class.
  constructor(paymentMethodData) {
    this.paymentMethodData = paymentMethodData;
  }

  // Return true if this payment method is available in the provided context.
  isAvailable(submarineContext) {
    return true;
  }

  // Return the payment method ID.
  id() {
    return this.paymentMethodData.id;
  }

  // Return the payment method processor.
  processor() {
    return this.paymentMethodData.payment_processor;
  }

  // Return the payment method type.
  type() {
    return this.paymentMethodData.payment_method_type;
  }

  // Return the icons to display for this payment method type.
  icons() {
    return [];
  }

  // Return an array of external JS dependencies required for this payment method.
  scripts() {
    return [];
  }

  // Set up this payment method.
  // This method must return a Promise object which resolves on success or rejects on error.
  setup({ submarine, submarineContext }) {}

  // Perform client-side validation of this payment method.
  // This method must return an array of validation errors (if any exist) in the following format:
  //
  //   [
  //     {
  //        "name": "cvv",
  //        "error": "missing"
  //     }
  //   ]
  //
  validate() {
    return [];
  }

  // Process this payment method (typically, this means tokenising the information we have available).
  // This method must return a Promise object which resolves on success or rejects on error.
  process({ submarineContext }) {}

  // Return an object containing the standardised information to be returned from a successful process() call.
  // This information is passed directly for the creation of a preliminary payment method.
  buildProcessResult(submarineContext, additionalData) {
    return Object.assign({}, {
      checkout_id: submarineContext.checkout && submarineContext.checkout.id,
      customer_id: submarineContext.customer && submarineContext.customer.id,
      customer_payment_method_id: null,
      payment_method_type: this.type(),
      payment_processor: this.processor(),
      presentment_total_price: submarineContext.checkout.totalPricePresentment,
      presentment_currency: submarineContext.checkout.currency,
      shop_payment_method_id: this.id(),
    }, additionalData);
  }

}
