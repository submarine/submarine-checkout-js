import { SubmarineCheckout } from "./submarine_checkout";
import { DEFAULT_TRANSLATIONS } from "./constants";

// main.js
// entry point for Submarine's steps customisations

// parse a JSON configuration object from the DOM
const parseJSONScript = (document, id) => {
  const script = document.getElementById(id);
  try {
    return JSON.parse(script.innerHTML);
  } catch { return null; }
};

// deep merge a simple options objects
const mergeOptions = (defaults, options) => {
  Object.keys(options).forEach(key => {
    if(options[key] instanceof Object) {
      defaults[key] = mergeOptions(defaults[key], options[key]);
    }
  });

  return Object.assign(
    {},
    defaults,
    options
  );
};

// initialise SubmarineCheckout
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

    // merge default translations with any provided in the context
    submarineContext.translations = mergeOptions(DEFAULT_TRANSLATIONS, submarineContext.translations || {});

    // initialise a SubmarineCheckout object and make it accessible to the window
    window.submarineCheckout = new SubmarineCheckout({ document, submarineConfig, submarineContext, Shopify });

    // find the Submarine payment_methods gateway on the page
    // console.log('finding gateway?...', `[data-select-gateway="${submarineConfig.submarineGatewayId}"]`);
    // const submarineGatewayElement = document.querySelector(`[data-select-gateway="${submarineConfig.submarineGatewayId}"]`);

    // bail if not on the payment_methods information page or Submarine gateway not present
    // if((Shopify.Checkout.step !== 'payment_method') || !submarineGatewayElement) { return; }

    // find the payment_methods subform
    // console.log('finding subform...', '[data-payment_methods-subform="required"]');
    // const paymentSubformElement = document.querySelector('[data-payment_methods-subform="required"]');
    // const paymentSubformContentElement = paymentSubformElement.querySelector('.content-box');

    // render the Submarine payment_methods method app on the payment_methods subform
    // render(<App submarineConfig={submarineConfig} submarineContext={submarineContext} />, paymentSubformElement, paymentSubformContentElement);
}

initialise();
