// payments.jsx
// This module loads on the payment step of checkout and renders the available Submarine payment options.

import Module from "../module";
import { render } from "preact";
import { PaymentsContainer } from "./components/payments_container";
import { STEP_PAYMENT_METHOD } from "../../lib/constants";

export default class Payments extends Module {

  steps() {
    return [
      STEP_PAYMENT_METHOD
    ];
  }

  // initialise the payments module
  initialise({ submarine, paymentMethods }) {
    const { document, submarineConfig, submarineContext } = this.options;

    // find the submarine gateway
    const submarineGatewayElement = document.querySelector(`[data-select-gateway="${submarineConfig.gateway.id}"]`);

    // bail if no gateway element found
    if(!submarineGatewayElement) {
      return;
    }

    // bail if the gateway element has already been initialised
    if(submarineGatewayElement.dataset.submarineInitialised) {
      return;
    }

    // find the submarine subform
    const paymentSubformElement = document.querySelector('[data-payment-subform="required"]');
    const paymentSubformContentElement = paymentSubformElement.querySelector('.content-box');

    // get references to the payment form and submit button
    const paymentForm = submarineGatewayElement.closest('[data-payment-form]');
    const paymentFormButton = paymentForm.querySelector('button[type="submit"]');

    // render the Submarine payment methods container component on the submarine gateway element
    render(
      <PaymentsContainer
        submarine={submarine}
        submarineConfig={submarineConfig}
        submarineContext={submarineContext}
        paymentMethods={paymentMethods}
        paymentForm={paymentForm}
        paymentFormButton={paymentFormButton}
      />,
      paymentSubformElement,
      paymentSubformContentElement
    );

    // flag the gateway element as being initialised
    submarineGatewayElement.dataset.submarineInitialised = true;

    // register a page change handler
    this.registerPageChangeHandler({ submarine, paymentMethods });
  }

  registerPageChangeHandler({ submarine, paymentMethods }) {
    const { pageChangeHandlerRegistered } = this;

    if(pageChangeHandlerRegistered) {
      return;
    }

    const { document } = this.options;

    document.addEventListener('page:change', () => {
      this.initialise({ submarine, paymentMethods });
    });

    this.pageChangeHandlerRegistered = true;
  }

}
