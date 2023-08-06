"use client";
import { useState } from "react";
import GridComponent from "./GridComponent";
import styles from "./tictactoe.module.scss";
const TicTacToe = () => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentPlayerData, setCurrentPlayerData] = useState({ 1: [], 2: [] });
  const [firstPlayer, setFirstPlayer] = useState([]);
  const [secondPlayer, setSecondPlayer] = useState([]);
  const onChangePlayerData = (data) => {
    if (!currentPlayerData[currentPlayer]?.includes(data)) {
      setCurrentPlayerData({
        ...currentPlayerData,
        [currentPlayer]: [...currentPlayerData[currentPlayer], data],
      });
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };
  const grid = new Array(9).fill(0);
  return (
    <div>
      <div className={styles.gridRow}>
        {grid.map((item, index) => {
          return (
            <GridComponent
              value={index}
              currentPlayer={currentPlayer}
              currentPlayerData={currentPlayerData}
              onChangePlayerData={onChangePlayerData}
            />
          );
        })}
      </div>
    </div>
  );
};
export default TicTacToe;
