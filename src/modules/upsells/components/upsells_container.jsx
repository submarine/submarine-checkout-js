import { useState } from "preact/compat";
import { SubmarineConfig, SubmarineContext } from "./contexts";
import { Upsell } from "./upsell";

export const UpsellsContainer = ({ submarine, submarineConfig, submarineContext, upsells }) => {
  const [currentUpsellIndex, setCurrentUpsellIndex] = useState(0);

  const currentUpsell = upsells[currentUpsellIndex];

  const moveToNextUpsell = () => {
    setCurrentUpsellIndex(currentUpsellIndex + 1);
  };

  return (
    <SubmarineConfig.Provider value={submarineConfig}>
      <SubmarineContext.Provider value={submarineContext}>
        <Upsell
          upsell={currentUpsell}
          moveToNextUpsell={moveToNextUpsell}
        />
      </SubmarineContext.Provider>
    </SubmarineConfig.Provider>
  )
};
