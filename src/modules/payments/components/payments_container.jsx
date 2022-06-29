import { Component } from "preact";
import { SubmarineConfig, SubmarineContext } from "../../common/contexts";
import { PaymentOptions } from "./payment_options";

export class PaymentsContainer extends Component {

  state = {
    selectedPaymentMethod: this.props.paymentMethods[0],
    validationErrors: []
  }

  setSelectedPaymentMethod(paymentMethod) {
    this.setState({
      selectedPaymentMethod: paymentMethod
    });
  }

  componentDidMount() {
    const { paymentForm } = this.props;

    // set up event listener for form submission
    paymentForm.addEventListener('submit', this.formSubmitted.bind(this));
  }

  componentWillUnmount() {
    const { paymentForm } = this.props;

    // remove event listener for form submission
    paymentForm.removeEventListener('submit', this.formSubmitted.bind(this));
  }

  formSubmitted(e) {
    const { selectedPaymentMethod } = this.state;

    // if no currently selected payment method, return without preventing submission
    if(!selectedPaymentMethod) {
      return;
    }

    e.preventDefault();

    // start loading
    this.startFormLoading();

    // perform client side validation of the payment method
    // if any validation errors are returned, we stop processing
    // it's up to the PaymentMethod implementation and its corresponding form component to display any errors
    const validationErrors = selectedPaymentMethod.validate();
    if (validationErrors.length) {
      this.stopFormLoading();
      this.setState({ validationErrors });

      return false;
    }

    alert('form was submitted!');
  }

  startFormLoading() {
    const { paymentFormButton } = this.props;

    paymentFormButton.disabled = true;
    paymentFormButton.classList.add('btn--loading');
  }

  stopFormLoading() {
    const { paymentFormButton } = this.props;

    paymentFormButton.disabled = false;
    paymentFormButton.classList.remove('btn--loading');
  }

  render() {
    const { submarine, submarineConfig, submarineContext, paymentMethods } = this.props;
    const { selectedPaymentMethod, validationErrors } = this.state;

    return (
      <SubmarineConfig.Provider value={submarineConfig}>
        <SubmarineContext.Provider value={submarineContext}>
          <PaymentOptions
            submarine={submarine}
            paymentMethods={paymentMethods}
            selectedPaymentMethod={selectedPaymentMethod}
            validationErrors={validationErrors}
            setSelectedPaymentMethod={this.setSelectedPaymentMethod.bind(this)}
          />
        </SubmarineContext.Provider>
      </SubmarineConfig.Provider>
    );
  }

}
