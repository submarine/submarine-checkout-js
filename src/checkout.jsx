import { render } from 'preact'
import { App } from './steps/payment/components/payment_methods'
import { parseJSONScript } from "./helpers";

//

// steps.jsx
// bootstrap submarine in the steps. if we're on the payment_methods page and the submarine
// gateway is present, render the Submarine payment_methods methods Preact app on the payment_methods
// method list.

const initialise = () => {
  // check we are in a browser context
  if(!window || !document) { return; }

  // check we have the Shopify javascript object available
  const Shopify = window.Shopify;

  // parse Submarine configuration and context
  const submarineConfig = parseJSONScript(document, 'submarine-config');
  const submarineContext = parseJSONScript(document, 'submarine-context');

  // bail if Shopify object not present or config or context parsing failed
  if(!Shopify || !Shopify.Checkout || !submarineConfig || !submarineContext) { return; }

  // find the Submarine payment_methods gateway on the page
  console.log('finding gateway?...', `[data-select-gateway="${submarineConfig.submarineGatewayId}"]`);
  const submarineGatewayElement = document.querySelector(`[data-select-gateway="${submarineConfig.submarineGatewayId}"]`);

  // bail if not on the payment_methods information page or Submarine gateway not present
  if((Shopify.Checkout.step !== 'payment_method') || !submarineGatewayElement) { return; }

  // find the payment_methods subform
  console.log('finding subform...', '[data-payment_methods-subform="required"]');
  const paymentSubformElement = document.querySelector('[data-payment_methods-subform="required"]');
  const paymentSubformContentElement = paymentSubformElement.querySelector('.content-box');

  // render the Submarine payment_methods method app on the payment_methods subform
  render(<App submarineConfig={submarineConfig} submarineContext={submarineContext} />, paymentSubformElement, paymentSubformContentElement);
}

initialise();
