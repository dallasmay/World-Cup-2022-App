import { ReactComponent as Crown } from "../../../assets/icons/SmallCrown.svg";

import styles from "./QfH2HPageCountryCard.module.css";

const QfH2HPageCountryCard = ({
  countryName,
  rank,
  abbr,
  position,
  isWinner,
}) => {
  return (
    <div className={styles["country-card-flex-container"]}>
      <div className={styles["position-container"]}>
        <p className={styles.position}>W{position}</p>
      </div>
      <div className={styles["country-card"]}>
        <span
          className={styles["flag-circle"]}
          style={
            isWinner || isWinner === undefined
              ? {
                  backgroundImage: `url(/1x1Flags/Country=${abbr}.png)`,
                }
              : {
                  backgroundImage: `url(/1x1Flags/Country=${abbr}.png)`,
                  opacity: "0.5",
                }
          }
        ></span>
        <div
          className={styles["country-text-container"]}
          style={isWinner || isWinner === undefined ? {} : { opacity: "0.5" }}
        >
          <p className={styles["country-name"]}>{countryName}</p>
          <p className={styles["country-rank"]}>({rank})</p>
        </div>
        {isWinner ? <Crown className={styles.crown} /> : !isWinner ? "" : ""}
      </div>
    </div>
  );
};

export default QfH2HPageCountryCard;