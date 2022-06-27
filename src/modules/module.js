export default class Module {

  constructor(options) {
    this.options = options;
  }

  // define the list of steps this modules should be loaded on
  steps() {
    return [];
  }

  // return true if this module should be active based on the current checkout step
  isActive() {
    const { Shopify } = this.options;
    return this.steps().includes(Shopify.Checkout.step);
  }

  // initialise this module
  initialise({ submarine, paymentMethods }) {}

}
