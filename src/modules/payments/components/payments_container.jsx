import { Component } from "preact";
import { SubmarineConfig, SubmarineContext } from "../../common/contexts";
import { PaymentOptions } from "./payment_options";

export class PaymentsContainer extends Component {

  state = {
    selectedPaymentMethod: this.props.paymentMethods[0]
  }

  setSelectedPaymentMethod(paymentMethod) {
    this.setState({
      selectedPaymentMethod: paymentMethod
    });
  }

  render() {
    const { submarine, submarineConfig, submarineContext, paymentMethods } = this.props;
    const { selectedPaymentMethod } = this.state;

    return (
      <SubmarineConfig.Provider value={submarineConfig}>
        <SubmarineContext.Provider value={submarineContext}>
          <PaymentOptions
            submarine={submarine}
            paymentMethods={paymentMethods}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={this.setSelectedPaymentMethod.bind(this)}
          />
        </SubmarineContext.Provider>
      </SubmarineConfig.Provider>
    );
  }

}
