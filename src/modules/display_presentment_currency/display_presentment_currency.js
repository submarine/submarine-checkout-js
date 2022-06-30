// display_presentment_currency.js
// This module loads on the thankyou and order status steps of checkout and converts displayed currency elements for
// orders that have been processed with Submarine's multi-currency support.

import Module from "../module";
import {
  ATTRIBUTE_PRESENTMENT_CURRENCY,
  ATTRIBUTE_PRESENTMENT_TOTAL_PRICE,
  STEP_ORDER_STATUS,
  STEP_THANK_YOU
} from "../../lib/constants";
import { parseFormattedAmount, formatAmount } from "../../lib/helpers";

// a list of css selectors that target DOM elements that display the order currency
const CURRENCY_ELEMENT_SELECTORS = [
  '.payment-due__currency'
];

// a list of css selectors that target DOM elements that display a price value
const PRICE_ELEMENT_SELECTORS = [
  '.payment-due__price',
  '.product__price .order-summary__emphasis',
  '[data-checkout-subtotal-price-target]',
  '[data-checkout-total-shipping-target]',
  '[data-checkout-total-taxes-target]',
  '.payment-method-list__item__amount'
];

// helper method to retrieve a specific order attribute
const getOrderAttribute = (submarineContext, attributeName) => {
  if(!submarineContext.order || !submarineContext.order.attributes || !submarineContext.order.attributes[attributeName]) {
    return null;
  }

  return submarineContext.order.attributes[attributeName];
};

export default class DisplayPresentmentCurrency extends Module {

  steps() {
    return [
      STEP_ORDER_STATUS,
      STEP_THANK_YOU
    ];
  }

  // initialise the display_presentment_currency module
  initialise() {
    const { document, submarineContext } = this.options;

    const shopCurrency = submarineContext.shop.currency;
    const shopTotalPrice = submarineContext.order.totalPrice;
    const presentmentCurrency = getOrderAttribute(submarineContext, ATTRIBUTE_PRESENTMENT_CURRENCY);

    // bail if there's no presentment currency that differs from the base currency
    if(!presentmentCurrency || (presentmentCurrency === shopCurrency)) {
      return;
    }

    // extract the presentment amount
    const presentmentTotalPrice = parseInt(getOrderAttribute(submarineContext, ATTRIBUTE_PRESENTMENT_TOTAL_PRICE));

    // calculate the exchange rate
    const exchangeRate = presentmentTotalPrice / shopTotalPrice;

    // convert elements that display the currency
    CURRENCY_ELEMENT_SELECTORS.forEach(selector => this.convertCurrencyElements(document, selector, presentmentCurrency));

    // convert elements that display prices
    PRICE_ELEMENT_SELECTORS.forEach(selector => this.convertPriceElements(document, selector, exchangeRate));
  }

  // find all currency elements matching the given selector and update them
  convertCurrencyElements(document, selector, presentmentCurrency) {
    document.querySelectorAll(selector).forEach(element => {
      element.innerText = presentmentCurrency;
    });
  }

  // find all price elements matching the given selector and update them
  convertPriceElements(document, selector, exchangeRate) {
    document.querySelectorAll(selector).forEach(element => {
      const shopAmount = parseFormattedAmount(element.innerText);
      const presentmentAmount = shopAmount * exchangeRate;
      element.innerText = formatAmount(presentmentAmount);
    });
  }

}
