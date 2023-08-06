"use client"; // This is a client component 👈🏽

import { useState } from "react";
import styles from "./index.module.scss";
const GridComponent = (props) => {
  const { onChangePlayerData, value, currentPlayer, currentPlayerData } = props;
  const [selectedState, setSelectedState] = useState("");
  const handleTabSelection = () => {
    onChangePlayerData(value);
  };

  return (
    <div
      className={styles.grid}
      tabIndex={0}
      role="button"
      onClick={handleTabSelection}
    >
      {currentPlayerData[1]?.includes(value) && <>X</>}
      {currentPlayerData[2]?.includes(value) && <>O</>}
    </div>
  );
};

export default GridComponent;
