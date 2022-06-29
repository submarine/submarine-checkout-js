export const PaymentOptionTitleInput = ({ paymentMethod, isCurrentlySelectedPaymentMethod, setSelectedPaymentMethod, canSelectPaymentMethod }) => {

  // if we can't select a payment method, simply return a hidden input
  if(!canSelectPaymentMethod) {
    return (
      <input
        id={`checkout_payment_method_shop_${paymentMethod.id()}`}
        value={`shop_payment_method_${paymentMethod.id()}`}
        type="hidden"
        name="checkout[attributes][_payment_method]"
      />
    );
  }

  // handler for our selector changing
  const handleChange = e => {
    if(e.target.checked) {
      setSelectedPaymentMethod(paymentMethod);
    }
  };

  // otherwise, return a radio select input
  return (
    <div className="radio__input">
      <input
        id={`checkout_payment_method_shop_${paymentMethod.id()}`}
        className="input-radio"
        type="radio"
        value={`shop_payment_method_${paymentMethod.id()}`}
        name="checkout[attributes][_payment_method]"
        checked={isCurrentlySelectedPaymentMethod}
        onChange={handleChange}
      />
    </div>
  );
};
