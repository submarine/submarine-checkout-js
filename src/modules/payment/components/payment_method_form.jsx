import classNames from "classnames";
import { getPaymentMethodFormComponent } from "./forms/initialise";

export const PaymentMethodForm = ({ paymentMethod, isCurrentlySelectedPaymentMethod }) => {
  const className = classNames({
    "radio-wrapper content-box__row content-box__row--secondary card-fields-container": true,
    "hidden": !isCurrentlySelectedPaymentMethod
  });

  const FormComponent = getPaymentMethodFormComponent(paymentMethod);

  return (
    <div className={className}>
      <FormComponent />
    </div>
  );
};
