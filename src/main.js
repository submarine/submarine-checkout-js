import { SubmarineCheckout } from "./submarine_checkout";
import { DEFAULT_TRANSLATIONS } from "./constants";

// main.js
// entry point for Submarine's checkout customisations

// parse a JSON configuration object from the DOM
const parseJSONScript = (document, id) => {
  const script = document.getElementById(id);
  try {
    return JSON.parse(script.innerHTML);
  } catch { return null; }
};

// deep merge a simple options objects
const mergeOptions = (defaults, options) => {
  const result = Object.assign({}, defaults);

  Object.keys(options).forEach(key => {
    if(options[key] instanceof Object) {
      result[key] = mergeOptions(defaults[key], options[key]);
    } else {
      result[key] = options[key];
    }
  });

  return result;
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
}

initialise();
