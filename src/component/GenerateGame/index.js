"use client";
import { v4 as uuidv4 } from "uuid";

const GenerateGame = () => {
  const generateId = uuidv4();

  const generateUniqueId = () => {
    const gamePage = `/${generateId}`;
    window.location.href = gamePage;
  };

  return (
    <div>
      <button onClick={generateUniqueId}>Generate Game</button>
    </div>
  );
};

export default GenerateGame;
