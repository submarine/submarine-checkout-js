// submarine_checkout.js

import { Submarine } from 'submarine-js';
import loadScripts from '@lemuria/load-scripts'

import { initialisePaymentMethod } from "./lib/payment_methods/initialise";

import CheckoutAttributes from "./modules/checkout_attributes/checkout_attributes";
import DisplayPresentmentCurrency from "./modules/display_presentment_currency/display_presentment_currency";
import Payments from "./modules/payments/payments";
import Upsells from "./modules/upsells/upsells";

export class SubmarineCheckout {

  constructor(options) {
    const { submarineConfig, submarineContext } = options;

    this.submarine = new Submarine(submarineConfig);
    this.paymentMethods = this.buildPaymentMethods(submarineConfig, submarineContext);
    this.modules = this.buildModules(options);

    this.preload();
  }

  buildPaymentMethods(submarineConfig, submarineContext) {
    return submarineConfig.paymentMethods
      .map(paymentMethodConfiguration => initialisePaymentMethod(paymentMethodConfiguration))
      .filter(paymentMethod => paymentMethod.isAvailable(submarineContext));
  }

  buildModules(options) {
    return [
      new CheckoutAttributes(options),
      new DisplayPresentmentCurrency(options),
      new Payments(options),
      new Upsells(options)
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
    this.modules.forEach(module => {
      if(!module.isActive()) {
        return;
      }

      module.initialise({
        submarine: this.submarine,
        paymentMethods: this.paymentMethods
      });
    });
  }

}
