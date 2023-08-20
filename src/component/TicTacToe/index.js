"use client";
import { useEffect, useState } from "react";
import GridComponent from "./GridComponent";
import { io } from "socket.io-client";

import styles from "./tictactoe.module.scss";

const socket = io("ws://localhost:3000");
const TicTacToe = () => {
  const initialState = {
    1: [],
    2: [],
  };
  const WinningValues = [
    //Row Wises
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Column Wise
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentPlayerData, setCurrentPlayerData] = useState(initialState);
  const [firstPlayer, setFirstPlayer] = useState([]);
  const [secondPlayer, setSecondPlayer] = useState([]);
  const [matchWonBy, setMatchWonBy] = useState();
  const [count, setCount] = useState(0);
  const [disablePreviousPlayer, setDisablePreviousPlayer] = useState(1);
  const checkPlayerCurrentStatus = (playerData) => {
    if (playerData[1].length > 2 || playerData[2].length > 2) {
      Object.keys(playerData).some((item) => {
        const currentPlayerData = playerData[item];
        if (currentPlayerData.length > 2) {
          if (
            WinningValues.some((item) =>
              item.every((val) => currentPlayerData.includes(val))
            )
          ) {
            setMatchWonBy(`Player ${item}`);
            return true;
          }
        }
      });
    }
  };
  useEffect(() => {
    socket.on("currentPlayerData", (val) => {
      const { currentPlayerData, currentPlayer } = val;
      setCurrentPlayerData(currentPlayerData);
      setDisablePreviousPlayer(currentPlayer);
      setCurrentPlayer(currentPlayer);
      checkPlayerCurrentStatus(currentPlayerData);
    });
  }, [socket]);

  useEffect(() => {
    if (
      currentPlayerData[1].length + currentPlayerData[2].length === 9 &&
      !matchWonBy
    ) {
      setMatchWonBy("Match Drawn");
    }
  }, [currentPlayerData[1].length, currentPlayerData[2].length]);

  const onChangePlayerData = (data) => {
    if (currentPlayer !== disablePreviousPlayer) {
      alert("Waiting for other player input");
      return;
    }
    if (
      !currentPlayerData[1]?.includes(data) &&
      !currentPlayerData[2]?.includes(data)
    ) {
      const updatedCurrentPlayerData = {
        ...currentPlayerData,
        [currentPlayer]: [...currentPlayerData[currentPlayer], data],
      };
      socket.emit("updatedCurrentPlayerData", {
        currentPlayerData: updatedCurrentPlayerData,
        currentPlayer: currentPlayer === 1 ? 2 : 1,
      });
      setCurrentPlayerData(updatedCurrentPlayerData);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      setDisablePreviousPlayer(currentPlayer);
      checkPlayerCurrentStatus(updatedCurrentPlayerData);
    }
  };
  const handleClearGame = () => {
    setCurrentPlayer(1);
    setCurrentPlayerData(initialState);
    setMatchWonBy("");
  };

  const grid = new Array(9).fill(0);
  return (
    <div>
      {matchWonBy}
      <div className={styles.gridRow}>
        {grid.map((item, index) => {
          return (
            <GridComponent
              key={index}
              value={index}
              currentPlayer={currentPlayer}
              currentPlayerData={currentPlayerData}
              onChangePlayerData={onChangePlayerData}
            />
          );
        })}
      </div>
      <button onClick={handleClearGame}>Clear Game</button>
    </div>
  );
};
export default TicTacToe;
