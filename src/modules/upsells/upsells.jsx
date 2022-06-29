// upsells.jsx
// This module loads on the thankyou step of checkout and presents the customer with upsell options if available.

import Module from "../module";
import { render } from "preact";
import { UpsellsContainer } from "./components/upsells_container";
import { STEP_ORDER_STATUS, STEP_THANK_YOU } from "../../lib/constants";

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

    // bail if we're outside the time window for upsells (60 minutes)
    // @TODO

    // generate a list of upsells for this order
    this.generateUpsells(submarine);
  }

  generateUpsells(submarine) {
    const { submarineContext } = this.options;

    const productIds = submarineContext.order.productIds;
    // const orderLocale = submarineContext.order.locale || ''; - locale-aware recommendations not currently available
    const recommendationRequests = productIds.map(productId => fetch(`/recommendations/products.json?product_id=${productId}&limit=10`).then(response => response.json()));

    Promise.all(recommendationRequests).then(recommendedProducts => {
      const recommendations = {};

      // build up upsells
      recommendedProducts.forEach(recommendation => {
        recommendation.products.forEach((product, index) => {
          // don't recommend products in the order
          if(productIds.includes(product.id)) {
            return;
          }

          // otherwise, if the product hasn't been seen before, add it
          if(recommendations[product.id] === undefined) {
            recommendations[product.id] = product;
            recommendations[product.id].rank = 0;
          }

          // increment the product's rank by the index
          recommendations[product.id].rank += 10 - index;
        });
      });

      // convert products into list of upsells
      const upsells = Object.keys(recommendations).map(productId => recommendations[productId]);

      // bail if no upsells available
      if(upsells.length === 0) {
        return;
      }

      // sort upsells by rank
      upsells.sort((a, b) => a.rank - b.rank);

      // trim upsells to a maximum of 5 options
      upsells.length = 5;

      // render available upsells
      this.renderUpsells(submarine, upsells);
    });
  }

  renderUpsells(submarine, upsells) {
    const { document, submarineConfig, submarineContext } = this.options;

    // find the body content element
    const contentElement = document.querySelector("[data-content]");
    const firstContentElement = contentElement.firstChild;

    // create a container node to render into
    const containerElement = document.createElement("div");

    // insert the container node into the content element
    contentElement.insertBefore(containerElement, firstContentElement);

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
