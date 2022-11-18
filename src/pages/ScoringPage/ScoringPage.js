import BackToProfile from "../../components/BackToProfile/BackToProfile";

import styles from "./ScoringPage.module.css";

const ScoringPage = () => {
  return (
    <>
      <BackToProfile path={"/home"} backTo="profile" noBottomLine={false} />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Scoring</h1>
        <h2 className={styles.heading2}>Group Stage</h2>
        <p className={`${styles["p-text"]} ${styles["description-text"]}`}>
          You'll receive points for correctly guessing the teams that move on.
          Points are also awarded if the teams are in the correct positions.
        </p>
        <div className={styles["points-container"]}>
          <p className={`${styles["p-text"]} ${styles["container-header"]}`}>
            Points awarded for:
          </p>
          <p className={`${styles["p-text"]} ${styles["placement-text"]}`}>
            Correct 1st Place: 26pts
          </p>
          <p className={`${styles["p-text"]} ${styles["placement-text"]}`}>
            Correct 2nd Place: 16pts
          </p>
          <p className={`${styles["p-text"]} ${styles["placement-text"]}`}>
            Correct 3rd Place: 10pts
          </p>
          <p className={`${styles["p-text"]} ${styles["placement-text"]}`}>
            Correct 4th Place: 10pts
          </p>
          <p className={`${styles["p-text"]} ${styles["placement-text"]}`}>
            Correct pick of each team qualifying for knockout stage (regardless
            of position): 18pts
          </p>
        </div>
        <p className={`${styles["p-text"]} ${styles.italic}`}>
          Example: In Group F, you picked Belgium to win the group and Croatia
          to finish second, but the actual result was swapped - Croatia wins the
          group and Belgium finishes second. You correctly picked 3rd and 4th
          place. Since you correctly predicted both Belgium and Croatia to move
          on, you would receive 35pts each, but no points for their incorrect
          placement. For correctly picking the placement of teams 3 and 4, you
          would earn 25 pts each for a total of 120 points.
        </p>
        <h2 className={styles.heading2}>Knockout Stage</h2>
        <p className={`${styles["p-text"]} ${styles["description-text"]}`}>
          You'll receive points for correctly predicting the teams that are
          moving on to the next round. Position bonus points are awarded if the
          team is in the right position.
        </p>
        <div className={styles["points-container"]}>
          <p className={`${styles["p-text"]} ${styles["container-header"]}`}>
            Points awarded moving on from:
          </p>
          <div className={styles["round-container"]}>
            <p className={styles.round}>Round of 16</p>
            <p className={styles["p-text"]}>40 pts + 40pt position bonus</p>
          </div>
          <div className={styles["round-container"]}>
            <p className={styles.round}>Quarterfinals</p>
            <p className={styles["p-text"]}>80 pts + 80pt position bonus</p>
          </div>
          <div className={styles["round-container"]}>
            <p className={styles.round}>Semifinals</p>
            <p className={styles["p-text"]}>160 pts + 160pt position bonus</p>
          </div>
          <div className={styles["round-container"]}>
            <p className={styles.round}>Third place</p>
            <p className={styles["p-text"]}>320 pts</p>
          </div>
          <div className={styles["round-container"]}>
            <p className={styles.round}>Finals</p>
            <p className={styles["p-text"]}>690 pts</p>
          </div>
        </div>
        <p className={`${styles["p-text"]} ${styles.italic}`}>
          Example: You picked England to win their group but Maguire scores an
          own goal against the USA and it causes them to take second. You have
          England going on to win the whole tournament and (somehow) they do.
          But there's one problem, it was on the wrong side of the bracket!
          Never fear, you will still receive points for every round they move
          on, but you won't receive any of the position point bonuses.
        </p>
      </div>
    </>
  );
};

export default ScoringPage;
