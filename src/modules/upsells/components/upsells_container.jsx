import { SubmarineConfig, SubmarineContext } from "./contexts";
import { Upsells } from "./upsells";

export const UpsellsContainer = ({ submarine, submarineConfig, submarineContext, upsells }) => {
  return (
    <SubmarineConfig.Provider value={submarineConfig}>
      <SubmarineContext.Provider value={submarineContext}>
        <Upsells
          upsells={upsells}
        />
      </SubmarineContext.Provider>
    </SubmarineConfig.Provider>
  )
};
