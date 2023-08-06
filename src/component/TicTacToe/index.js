import GridComponent from "./GridComponent";
import styles from "./tictactoe.module.scss";
const TicTacToe = () => {
  console.log("Hello");

  const grid = new Array(9).fill(0);
  return (
    <div>
      <div className={styles.gridRow}>
        {grid.map((item, index) => {
          return <GridComponent value={index} />;
        })}
      </div>
    </div>
  );
};
export default TicTacToe;
