import TicTacToe from "../TicTacToe";
import styles from "./Home.module.scss";
const HomeComponent = () => {
  return (
    <div className={styles.main}>
      Tic Tac Toe
      <TicTacToe />
    </div>
  );
};
export default HomeComponent;
