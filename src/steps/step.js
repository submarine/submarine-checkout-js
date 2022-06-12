export default class Step {

  constructor(options) {
    this.options = options;
  }

  // define the possible names of this step
  names() {
    return [];
  }

  // return true if this is the current checkout step
  isCurrent() {
    const { Shopify } = this.options;
    return this.names().includes(Shopify.Checkout.step);
  }

  // initialise this step
  initialise({ submarine, paymentMethods }) {}

}
