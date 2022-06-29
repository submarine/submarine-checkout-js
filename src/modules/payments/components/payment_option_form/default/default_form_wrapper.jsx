import classNames from "classnames";

export const DefaultFormWrapper = ({ isCurrentlySelectedPaymentMethod, children }) => {
  const className = classNames({
    "radio-wrapper content-box__row content-box__row--secondary card-fields-container": true,
    "hidden": !isCurrentlySelectedPaymentMethod
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
};
