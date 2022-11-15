import styles from "./GroupStagePageCountryCard.module.css";

const GroupStagePageCountryCard = ({ countryName, rank, abbr, hasSeen, index }) => {
  return (
    <div className={styles["country-card-flex-container"]}>
      {!hasSeen ? <div className={styles["dot-container"]}>
        <span className={styles["black-dot"]}></span>
      </div> :
      <div className={styles["position-container"]}>
        <p className={styles.position}>{index + 1}</p>
      </div>}
      <div className={styles["country-card"]}>
        <span
          className={styles["flag-circle"]}
          style={{
            backgroundImage: `url(/1x1Flags/Country=${abbr}.png)`,
          }}
        ></span>
        <div className={styles["country-text-container"]}>
          <p className={styles["country-name"]}>{countryName}</p>
          <p className={styles["country-rank"]}>({rank})</p>
        </div>
      </div>
    </div>
  );
};

export default GroupStagePageCountryCard;
