import styles from "./QfLockedH2HCountryCard.module.css";

const QfLockedH2HCountryCard = ({ whiteText, greyText, position }) => {
  return (
    <div className={styles["country-card-flex-container"]}>
      <div className={styles["position-container"]}>
        <p className={styles.position}>{position}</p>
      </div>
      <div className={styles["country-card"]}>
        <p className={styles["white-text"]}>{whiteText}</p>
        <p className={styles["grey-text"]}>{greyText}</p>
      </div>
    </div>
  );
};

export default QfLockedH2HCountryCard;