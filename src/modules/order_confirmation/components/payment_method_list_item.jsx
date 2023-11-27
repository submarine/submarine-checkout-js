const CARD_ICON_CLASS_MAPPINGS = {
  mastercard: 'master'
};

const getIcon = (paymentMethodType, paymentData) => {
  switch (paymentMethodType) {
    case 'paypal':
      return 'paypal';
    case 'credit-card':
      return CARD_ICON_CLASS_MAPPINGS[paymentData.brand] || paymentData.brand
    default:
      return 'generic';
  }
};

const getName = (paymentMethodType, paymentData) => {
  switch (paymentMethodType) {
    case 'paypal':
      return 'Paypal';
    case 'credit-card':
      return paymentData.brand || 'Credit card'
    default:
      return 'Payment Method';
  }
}

const getDetail = (paymentMethodType, paymentData) => {
  switch (paymentMethodType) {
    case 'paypal':
      return paymentData.email;
    case 'credit-card':
      return paymentData.last4 ? `ending in ${paymentData.last4}` : (paymentData.brand || 'Credit card');
    default:
      return 'Credit card';
  }
}

export const PaymentMethodListItem = ({ paymentMethod, amountFormatted }) => {
  const paymentMethodType = paymentMethod.attributes.payment_method_type;
  const paymentData = paymentMethod.attributes.payment_data || {};

  return (
    <li className="payment-method-list__item">
      <i className={`payment-icon payment-icon--${getIcon(paymentMethodType, paymentData)} payment-method-list__item-icon`}>
        <span className="visually-hidden">{getName(paymentMethodType, paymentData)}</span>
      </i>
      <span className="payment-method-list__item__info">{getDetail(paymentMethodType, paymentData)}</span>
      <span className="payment-method-list__item__amount emphasis"> - {amountFormatted}</span>
    </li>
  );
};
