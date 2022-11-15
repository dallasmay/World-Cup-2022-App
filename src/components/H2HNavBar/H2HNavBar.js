import { Link } from "react-router-dom";

import { ReactComponent as PreviousArrow } from "../../assets/icons/PreviousArrow.svg";

import styles from "./H2HNavBar.module.css";

const H2HNavBar = ({ round, gameNum }) => {
  const ro16GameNumArr = [49, 51, 50, 52, 53, 55, 54, 56];
  const ro16Index = ro16GameNumArr.indexOf(gameNum);
  const ro16PrevPath = (gameNum === 49 ? "" : `/${round}/game-${ro16GameNumArr[ro16Index - 1]}`);
  const ro16NextPath = (gameNum === 56 ? "" : `/${round}/game-${ro16GameNumArr[ro16Index + 1]}`);

  const qfGameNumArr = [57, 59, 58, 60];
  const qfIndex = qfGameNumArr.indexOf(gameNum);
  const qfPrevPath = (gameNum === 57 ? "" : `/${round}/game-${qfGameNumArr[qfIndex - 1]}`);
  const qfNextPath = (gameNum === 60 ? "" : `/${round}/game-${qfGameNumArr[qfIndex + 1]}`);
  return (
    <div className={styles["group-navigation-bar"]}>
      <Link to={round === "ro16" ? ro16PrevPath : round === "quarterfinals" ? qfPrevPath : ""}>
        <button className={styles["previous-btn"]}>
          <PreviousArrow className={styles["previous-arrow"]} />
        </button>
      </Link>
      <Link to={round === "ro16" ? ro16NextPath : round === "quarterfinals" ? qfNextPath : ""}>
        <button className={styles["next-btn"]}>Next Match</button>
      </Link>
    </div>
  );
};

export default H2HNavBar;
