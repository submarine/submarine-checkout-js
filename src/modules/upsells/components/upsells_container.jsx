import { SubmarineConfig, SubmarineContext } from "./contexts";
import { Upsells } from "./upsells";

export const UpsellsContainer = ({ submarine, upsells, submarineConfig, submarineContext }) => {
  return (
    <SubmarineConfig.Provider value={submarineConfig}>
      <SubmarineContext.Provider value={submarineContext}>
        <Upsells
          submarine={submarine}
          upsells={upsells}
        />
      </SubmarineContext.Provider>
    </SubmarineConfig.Provider>
  )
};
