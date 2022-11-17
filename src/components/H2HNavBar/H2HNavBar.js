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

  const semiGameNumArr = [61, 62];
  const semiIndex = semiGameNumArr.indexOf(gameNum);
  const semiPrevPath = (gameNum === 61 ? "" : `/${round}/game-${semiGameNumArr[semiIndex - 1]}`);
  const semiNextPath = (gameNum === 62 ? "" : `/${round}/game-${semiGameNumArr[semiIndex + 1]}`);

  const prevStyle = (gameNum === 49 || gameNum === 57 || gameNum === 61 ? {visibility: "hidden"} : {});
  const nextStyle = (gameNum === 56 || gameNum === 60 || gameNum === 62 ? {visibility: "hidden"} : {});

  return (
    <div className={styles["group-navigation-bar"]}>
      <Link to={round === "ro16" ? ro16PrevPath : round === "quarterfinals" ? qfPrevPath : round === "semifinals" ? semiPrevPath : ""}>
        <button className={styles["previous-btn"]} style={prevStyle}>
          <PreviousArrow className={styles["previous-arrow"]} />
        </button>
      </Link>
      <Link to={round === "ro16" ? ro16NextPath : round === "quarterfinals" ? qfNextPath : round === "semifinals" ? semiNextPath : ""}>
        <button className={styles["next-btn"]} style={nextStyle}>Next Match</button>
      </Link>
    </div>
  );
};

export default H2HNavBar;
