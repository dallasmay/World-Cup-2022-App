import BackToProfile from "../../components/BackToProfile/BackToProfile";

import styles from "./LeaderboardPage.module.css";

const LeaderboardPage = () => {
  return (
    <>
      <BackToProfile />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Leaderboard</h1>
        <div className={styles["leaderboard-container"]}>
          <div className={styles["team-container"]}>
            <p className={styles.rank}>1</p>
            <p className={styles["team-name"]}>Diamond Dyl's</p>
            <p className={styles.points}>487</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaderboardPage;