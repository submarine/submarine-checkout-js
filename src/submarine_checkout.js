// submarine_checkout.js

import { Submarine } from 'submarine-js';
import loadScripts from '@lemuria/load-scripts'

import { SELECTOR_CHECKOUT_LOADING_ELEMENTS } from "./lib/constants";

import { initialisePaymentMethod } from "./lib/payment_methods/initialise";

import CheckoutAttributes from "./modules/checkout_attributes/checkout_attributes";
import DisplayPresentmentCurrency from "./modules/display_presentment_currency/display_presentment_currency";
import OrderConfirmation from "./modules/order_confirmation/order_confirmation";
import Payments from "./modules/payments/payments";
import Upsells from "./modules/upsells/upsells";

export class SubmarineCheckout {

  constructor(options) {
    const { document, submarineConfig, submarineContext } = options;

    this.document = document;
    this.submarine = new Submarine(submarineConfig);
    this.paymentMethods = this.buildPaymentMethods(submarineConfig, submarineContext);
    this.modules = this.buildModules(options);

    this.initialised = false;

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
      new OrderConfirmation(options),
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
    if(this.initialised) {
      return;
    }

    if(this.checkoutIsLoading()) {
      this.awaitCheckoutLoad();
      return;
    }

    this.modules.forEach(module => {
      if(!module.isActive()) {
        return;
      }

      module.initialise({
        submarine: this.submarine,
        paymentMethods: this.paymentMethods
      });
    });

    this.initialised = true;
  }

  checkoutIsLoading() {
    const { document } = this;
    return !!document.querySelector(SELECTOR_CHECKOUT_LOADING_ELEMENTS);
  }

  awaitCheckoutLoad() {
    const { document } = this;
    document.addEventListener('page:change', this.initialise.bind(this));
  }

}
