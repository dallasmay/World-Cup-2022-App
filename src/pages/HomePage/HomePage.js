import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactComponent as WCLogo } from "../../assets/icons/SoccerBallLogo.svg";
import { ReactComponent as Caret } from "../../assets/icons/Caret.svg";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const teamName = useSelector((state) => state.teamName);

  return (
    <>
      <div className={styles["logo-container"]}>
        <WCLogo className={styles["wc-logo"]} />
      </div>
      <div className={styles["content-container"]}>
        <div className={styles["team-container"]}>
          <p className={styles.label}>Your team</p>
          <p className={styles["team-name"]}>Diamond Dyl's</p>
        </div>
        <div className={styles["scoring-container"]}>
          <div className={styles["position-container"]}>
            <p className={`${styles.label} ${styles["score-label"]}`}>Score</p>
            <p className={styles.points}>489 pts</p>
          </div>
          <div className={styles["position-container"]}>
            <p className={`${styles.label} ${styles["score-label"]}`}>Rank</p>
            <p className={styles.points}>16th</p>
          </div>
        </div>
        <nav>
          <ul className={styles["links-container"]}>
            <Link>
              <li className={styles["link-li"]}>
                <p className={styles["link-text"]}>Your bracket</p>
                <Caret className={styles["caret-svg"]} />
              </li>
            </Link>
            <Link to="/leaderboard">
              <li className={styles["link-li"]}>
                <p className={styles["link-text"]}>Leaderboard</p>
                <Caret className={styles["caret-svg"]} />
              </li>
            </Link>
            <Link>
              <li className={styles["link-li"]}>
                <p className={styles["link-text"]}>Scoring system</p>
                <Caret className={styles["caret-svg"]} />
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HomePage;
