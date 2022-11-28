import { useSelector } from "react-redux";

import H2HPageCountryCard from "../../../components/ro16/H2HPageCountryCard/H2HPageCountryCard";
import { ReactComponent as Lock } from "../../../assets/icons/Lock.svg";

import styles from "./OtherHeadToHeadCard.module.css";

const OtherHeadToHeadCard = ({ game, countries, hasWinner }) => {
  const ro16Winners = useSelector((state) => state.otherBracket.ro16Winners);

  return (
    <div className={styles["head-to-head-card"]}>
      <div className={styles["header"]}>
        <div>
          <p className={styles["game-text"]}>Game</p>
          <p className={styles["game-letter"]}>{game}</p>
        </div>
        <Lock className={styles["lock-icon"]} />
      </div>
      <div className={styles["country-card-container"]}>
        {countries.map((country) => {
            let winner = ro16Winners.find((ele) => {
              return ele.name === country.name;
            });
            return (
              <H2HPageCountryCard
                key={country.fifa_rank}
                countryName={country.name}
                rank={country.fifa_rank}
                abbr={country.abbr}
                position={
                  `${country.group_letter.toUpperCase()}` +
                  `${country.position}`
                }
                group={country.group_letter}
                positionNumber={country.position}
                isWinner={
                  winner?.name === undefined && hasWinner
                    ? false
                    : winner?.name === country.name
                    ? true
                    : undefined
                }
              />
            );
        })}
      </div>
    </div>
  );
};

export default OtherHeadToHeadCard;
