import classNames from "classnames";

const BraintreeCreditCardFormWrapper = ({ isCurrentlySelectedPaymentMethod, loading, children }) => {
  const className = classNames({
    "radio-wrapper content-box__row content-box__row--secondary card-fields-container": true,
    "card-fields-container--loaded card-fields-container--transitioned": !loading,
    "hidden": !isCurrentlySelectedPaymentMethod
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default BraintreeCreditCardFormWrapper;
