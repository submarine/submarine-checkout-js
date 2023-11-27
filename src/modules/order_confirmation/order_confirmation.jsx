import Module from "../module";
import { STEP_ORDER_STATUS, STEP_THANK_YOU } from "../../lib/constants";
import { render } from "preact";
import { PaymentMethodListItem } from "./components/payment_method_list_item";

// css selector to target the list of payment methods
const PAYMENT_METHOD_LIST_SELECTOR = '.payment-method-list';

export default class OrderConfirmation extends Module {

  steps() {
    return [STEP_ORDER_STATUS, STEP_THANK_YOU];
  }

  initialise() {
    this.findPaymentMethod();
    this.renderPaymentMethod();
  }

  findPaymentMethod() {
    // parse the payment method attribute
    const [paymentMethodType, paymentMethodId] = this.parsePaymentMethodAttribute();

    // parse the authorized payment method id from transaction data
    const authorizedPaymentMethodId = this.parseAuthorizedPaymentMethodId();

    // attempt to find the customer payment method
    const customerPaymentMethod = this.findCustomerPaymentMethod(paymentMethodType, paymentMethodId, authorizedPaymentMethodId);
    if(customerPaymentMethod) {
      this.paymentMethod = customerPaymentMethod;
      return;
    }

    // fall back to the shop payment method
    const shopPaymentMethod = this.findShopPaymentMethod(paymentMethodType, paymentMethodId);
    if(shopPaymentMethod) {
      this.paymentMethod = {
        type: 'shop_payment_method',
        attributes: {
          payment_method_type: shopPaymentMethod.payment_method_type
        }
      };
      return;
    }

    // fall back to a default payment method
    this.paymentMethod = {
      type: 'fallback_payment_method',
      attributes: {
        payment_method_type: 'credit-card'
      }
    };
  }

  parsePaymentMethodAttribute() {
    const { submarineContext } = this.options;
    const paymentMethodAttribute = submarineContext.order.attributes._payment_method;
    return paymentMethodAttribute.split(/_(?=\d+$)/);
  }

  parseAuthorizedPaymentMethodId() {
    const { submarineContext } = this.options;

    return submarineContext.order.transactions.map(transaction => {
      if(!transaction.gateway.includes('submarine')) {
        return null;
      }

      if((transaction.kind !== 'sale') || (transaction.status !== 'success')) {
        return null;
      }

      if(!transaction.receipt || !transaction.receipt.x_gateway_reference) {
        return null;
      }

      const matches = transaction.receipt.x_gateway_reference.match(/^\d+/);

      return Number(matches[0]);
    }).find(authorizedPaymentMethodId => !!authorizedPaymentMethodId);
  }

  findCustomerPaymentMethod(paymentMethodType, paymentMethodId, authorizedPaymentMethodId) {
    const { submarineContext } = this.options;

    return submarineContext.customer.paymentMethods.data.find(customerPaymentMethod => {
      if(customerPaymentMethod.attributes.authorized_payment_method_id === authorizedPaymentMethodId) {
        return true;
      }

      return (customerPaymentMethod.type === paymentMethodType) && (Number(customerPaymentMethod.id) === Number(paymentMethodId));
    });
  }

  findShopPaymentMethod(paymentMethodType, paymentMethodId) {
    const { submarineConfig } = this.options;

    if(paymentMethodType !== 'shop_payment_method') {
      return null;
    }

    return submarineConfig.paymentMethods.find(shopPaymentMethod => {
      return Number(shopPaymentMethod.id) === Number(paymentMethodId);
    });
  }

  renderPaymentMethod() {
    const { document, submarineContext } = this.options;
    const { paymentMethod } = this;

    const paymentMethodList = document.querySelector(PAYMENT_METHOD_LIST_SELECTOR);

    console.log('renderPaymentMethod', paymentMethod, submarineContext.order.totalPriceFormatted);

    // render the payment method list item into the payment method list
    render(
      <PaymentMethodListItem
        paymentMethod={paymentMethod}
        amountFormatted={submarineContext.order.totalPriceFormatted}
      />,
      paymentMethodList
    );
  }
}
