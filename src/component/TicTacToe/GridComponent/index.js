"use client"; // This is a client component 👈🏽

import { useState } from "react";
import styles from "./index.module.scss";
const GridComponent = (props) => {
  const [selectedState, setSelectedState] = useState("");
  const handleGridSelection = () => {};
  return <div className={styles.grid}></div>;
};

export default GridComponent;
