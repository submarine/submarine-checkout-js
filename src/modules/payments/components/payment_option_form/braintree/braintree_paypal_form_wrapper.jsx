import classNames from "classnames";

const BraintreePaypalFormWrapper = ({ isCurrentlySelectedPaymentMethod, children }) => {
  const className = classNames({
    "radio-wrapper content-box__row content-box__row--secondary": true,
    "hidden": !isCurrentlySelectedPaymentMethod
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default BraintreePaypalFormWrapper;
