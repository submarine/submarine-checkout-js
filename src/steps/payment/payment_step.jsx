import Step from "../step";
import { render } from "preact";
import { PaymentMethodsContainer } from "./components/payment_methods_container";

export default class PaymentStep extends Step {

  names() {
    return [
      'payment_method'
    ];
  }

  // initialise the payment step
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
  }

}
