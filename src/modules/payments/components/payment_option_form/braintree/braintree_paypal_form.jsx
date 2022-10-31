import ErrorMessage from "../common/error_message";
import { Fragment } from "preact";
import { t } from "../../../../../lib/helpers";
import { useContext } from "preact/compat";
import { SubmarineContext } from "../../../../common/contexts";

const BraintreePaypalForm = ({ validationErrors }) => {
  const submarineContext = useContext(SubmarineContext);

  // convert any validation errors to a translated list of messages
  const errors = validationErrors.map(validationError => {
    return t(`payment_methods.braintree.paypal.errors.${validationError.name}.${validationError.error}`, submarineContext.translations);
  });

  return (
    <Fragment>
      <div className="blank-slate">
        <div id="braintree-paypal-mount" className="braintree-paypal-mount" />
      </div>
      <ErrorMessage
        errors={errors}
      />
    </Fragment>
  );
};

export default BraintreePaypalForm;
