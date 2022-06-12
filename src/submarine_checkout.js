import { Submarine } from 'submarine-js';
import { initialisePaymentMethod } from "./payment_methods/initialise";
import PaymentStep from "./steps/payment/payment_step";
import ThankyouStep from "./steps/thankyou/thankyou_step";
import loadScripts from '@lemuria/load-scripts'

export class SubmarineCheckout {

  constructor(options) {
    const { submarineConfig, submarineContext } = options;

    this.submarine = new Submarine(submarineConfig);
    this.paymentMethods = this.buildPaymentMethods(submarineConfig, submarineContext);
    this.steps = this.buildSteps(options);

    this.preload();
  }

  buildPaymentMethods(submarineConfig, submarineContext) {
    return submarineConfig.paymentMethods
      .map(paymentMethodConfiguration => initialisePaymentMethod(paymentMethodConfiguration))
      .filter(paymentMethod => paymentMethod.isAvailable(submarineContext));
  }

  buildSteps(options) {
    return [
      new PaymentStep(options),
      new ThankyouStep(options)
    ];
  }

  preload() {
    const scripts = [].concat.apply([], this.paymentMethods.map(paymentMethod => paymentMethod.scripts()));

    if(scripts.length === 0) {
      this.initialise();
      return;
    }

    loadScripts(scripts, () => {
      this.initialise();
    });
  }

  initialise() {
    this.steps.forEach(step => {
      if(!step.isCurrent()) {
        return;
      }

      step.initialise({
        submarine: this.submarine,
        paymentMethods: this.paymentMethods
      });
    });
  }

}
