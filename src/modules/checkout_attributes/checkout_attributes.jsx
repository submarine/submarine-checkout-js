// checkout_attributes.js
// This module loads on the payment step and ensures that attributes that may be attached to a checkout are persisted
// when Submarine is in use (as Submarine sets _payment_method and potentially other checkout attributes).

import Module from "../module";
import { render } from "preact";
import { Attributes } from "./components/attributes";
import {
  ATTRIBUTE_PAYMENT_METHOD,
  ATTRIBUTE_PRESENTMENT_AMOUNT,
  ATTRIBUTE_PRESENTMENT_CURRENCY,
  STEP_PAYMENT_METHOD
} from "../../lib/constants";

// A list of attributes that may exist on a checkout but do not need to be persisted by this module as they are
// managed elsewhere.
const IGNORED_ATTRIBUTES = [
  ATTRIBUTE_PAYMENT_METHOD,
  ATTRIBUTE_PRESENTMENT_AMOUNT,
  ATTRIBUTE_PRESENTMENT_CURRENCY
];

export default class CheckoutAttributes extends Module {

  steps() {
    return [
      STEP_PAYMENT_METHOD
    ];
  }

  // initialise the checkout_attributes module
  initialise() {
    const { document } = this.options;

    const attributes = this.buildAttributes();

    // find the form element
    const formElement = document.querySelector("[data-payment-form]");
    const lastFormElement = formElement.lastChild;

    // create a container node to render into
    const containerElement = document.createElement("div");

    // insert the container node into the form element
    formElement.insertBefore(containerElement, lastFormElement);

    // render the checkout attributes component into the form
    render(
      <Attributes
        attributes={attributes}
      />,
      containerElement
    );

  }

  buildAttributes() {
    const { submarineContext } = this.options;

    // create a copy of existing attributes attached to the checkout
    const attributes = Object.assign({}, submarineContext.checkout.attributes || {});

    // remove any attributes that are managed elsewhere
    IGNORED_ATTRIBUTES.forEach(key => delete attributes[key]);

    return attributes;
  }

}
