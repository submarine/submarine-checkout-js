// upsells.jsx
// This module loads on the thankyou step of checkout and presents the customer with upsell options if available.

import Module from "../module";
import { render } from "preact";
import { UpsellsContainer } from "./components/upsells_container";
import { STEP_ORDER_STATUS, STEP_THANK_YOU, UPSELL_AGE_LIMIT_IN_SECONDS } from "../../lib/constants";

export default class Upsells extends Module {

  steps() {
    return [
      STEP_ORDER_STATUS,
      STEP_THANK_YOU
    ];
  }

  // initialise the upsells module
  initialise({ submarine }) {
    const { submarineContext } = this.options;

    // bail if we don't have order data or the order wasn't processed through Submarine
    if(!submarineContext.order || !submarineContext.order.gateway.includes('submarine')) {
      return;
    }

    // bail if we're outside the time window for upsells
    if(submarineContext.order.ageInSeconds > UPSELL_AGE_LIMIT_IN_SECONDS) {
      return;
    }

    // generate a list of upsells for this order
    this.generateUpsells(submarine);
  }

  generateUpsells(submarine) {
    const { submarineContext } = this.options;
    const productIds = submarineContext.order.productIds;

    // start by fetching a list of upsellable products in the base currency
    fetch(`/collections/all?filter.v.m.submarine.permit_upsell=true&view=upsells&currency=${submarineContext.shop.currency}`)
      .then(response => response.json())
      .then(upsellableProducts => {
        // remove products that already exist in the order
        productIds.forEach(productId => delete upsellableProducts[productId]);

        // then, fetch recommended products based on the current order
        const recommendationRequests = productIds.map(productId => fetch(`/recommendations/products.json?product_id=${productId}&limit=10`).then(response => response.json()));

        Promise.all(recommendationRequests).then(recommendedProducts => {
          const recommendations = {};

          // build up recommendation rankings
          recommendedProducts.forEach(recommendation => {
            recommendation.products.forEach((product, index) => {
              // don't recommend products in the order
              if(productIds.includes(product.id)) {
                return;
              }

              // don't recommend products that aren't in the upsellable list
              if(upsellableProducts[product.id] === undefined) {
                return;
              }

              // otherwise, if the product hasn't been seen before, add it
              if(recommendations[product.id] === undefined) {
                recommendations[product.id] = upsellableProducts[product.id];
                recommendations[product.id].rank = 0;
              }

              // increment the product's rank by the index
              recommendations[product.id].rank += 10 - index;
            });
          });

          // convert recommendations into list of upsells
          const upsells = Object.keys(recommendations).map(productId => upsellableProducts[productId]);

          // bail if no upsells available
          if(upsells.length === 0) {
            return;
          }

          // filter variants in the resulting list
          upsells.forEach(upsell => {
            upsell.variants = upsell.variants.filter(variant => {
              return variant.permitUpsell;
            });
          });

          // sort upsells by rank
          upsells.sort((a, b) => b.rank - a.rank);

          // trim upsells to a maximum of 5 options
          if(upsells.length > 5) {
            upsells.length = 5;
          }

          // render available upsells
          this.renderUpsells(submarine, upsells);
        });
      });
  }

  renderUpsells(submarine, upsells) {
    const { document, submarineConfig, submarineContext } = this.options;

    // find the first section element
    const sectionsElement = document.querySelector("[data-step] .step__sections");
    const firstSectionElement = document.querySelector("[data-step] .step__sections .section");
    const secondSectionElement = firstSectionElement.nextSibling;

    // create a container node to render into
    const containerElement = document.createElement("div");
    containerElement.classList.add('section');

    // insert the container node into the content element
    sectionsElement.insertBefore(containerElement, secondSectionElement);

    // render the upsells component into the page
    render(
      <UpsellsContainer
        submarine={submarine}
        submarineConfig={submarineConfig}
        submarineContext={submarineContext}
        upsells={upsells}
      />,
      containerElement
    );
  }

}
