import { SubmarineConfig, SubmarineContext } from "./contexts";
import { PaymentMethods } from "./payment_methods";

export const PaymentMethodsContainer = ({ submarine, submarineConfig, submarineContext, paymentMethods }) => {
  return (
    <SubmarineConfig.Provider value={submarineConfig}>
      <SubmarineContext.Provider value={submarineContext}>
        <PaymentMethods
          paymentMethods={paymentMethods}
        />
      </SubmarineContext.Provider>
    </SubmarineConfig.Provider>
  )
};
