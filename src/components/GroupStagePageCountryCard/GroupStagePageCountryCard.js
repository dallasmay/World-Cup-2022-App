import styles from "./GroupStagePageCountryCard.module.css";

const GroupStagePageCountryCard = ({ countryName, rank, abbr }) => {
  return (
    <div className={styles["country-card-flex-container"]}>
      <div className={styles["position-container"]}>
        <span className={styles["black-dot"]}></span>
      </div>
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
