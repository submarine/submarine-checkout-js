import { RadioWrapper } from "./radio_wrapper";
import { SubmarineConfig, SubmarineContext } from "./contexts";

export const PaymentMethods = ({ submarine, submarineConfig, submarineContext, paymentMethods }) => {
  return (
    <SubmarineConfig.Provider value={submarineConfig}>
      <SubmarineContext.Provider value={submarineContext}>
        <div class="content-box">
          <RadioWrapper gatewayId={submarineConfig.submarineGatewayId} />
        </div>
      </SubmarineContext.Provider>
    </SubmarineConfig.Provider>
  )
};
