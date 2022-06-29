// payments.jsx
// This module loads on the payment step of checkout and renders the available Submarine payment options.

import Module from "../module";
import { render } from "preact";
import { PaymentMethodsContainer } from "./components/payment_methods_container";

export default class Payments extends Module {

  steps() {
    return [
      'payment_method'
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

    // find the submarine subform
    const paymentSubformElement = document.querySelector('[data-payment-subform="required"]');
    const paymentSubformContentElement = paymentSubformElement.querySelector('.content-box');

    // render the Submarine payment methods container component on the submarine gateway element
    render(
      <PaymentMethodsContainer
        submarine={submarine}
        submarineConfig={submarineConfig}
        submarineContext={submarineContext}
        paymentMethods={paymentMethods}
      />,
      paymentSubformElement,
      paymentSubformContentElement
    );

    // set up each payment method
    paymentMethods.forEach(paymentMethod => paymentMethod.setup({ submarine, submarineContext }));
  }

}
