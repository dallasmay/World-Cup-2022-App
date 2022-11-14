import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import H2HPageCountryCard from "../H2HPageCountryCard/H2HPageCountryCard";
import LockedH2HCountryCard from "../LockedH2HCountryCard/LockedH2HCountryCard";
import { ReactComponent as Lock } from "../../assets/icons/Lock.svg";
import { ReactComponent as LinkArrow } from "../../assets/icons/LinkToGroupArrow.svg";
import { ReactComponent as Pip } from "../../assets/icons/Pip.svg";

import styles from "./HeadToHeadCard.module.css";

const HeadToHeadCard = ({ game, countries, hasWinner }) => {
  const isGroupStageComplete = useSelector(
    (state) => state.auth.isGroupStageComplete
  );
  const ro16Winners = useSelector((state) => state.bracket.ro16Winners);

  return (
    <Link to={`/ro16/game-${game}`}>
      <div className={styles["head-to-head-card"]}>
        <div className={styles["header"]}>
          <div>
            <p className={styles["game-text"]}>Game</p>
            <p className={styles["game-letter"]}>{game}</p>
          </div>
          {isGroupStageComplete && hasWinner ? (
            <LinkArrow className={styles["arrow-icon"]} />
          ) : isGroupStageComplete && !hasWinner ? (
            <>
              <Pip className={styles.pip}/>
              <LinkArrow className={styles["arrow-icon"]} />
            </>
          ) : (
            <Lock className={styles["lock-icon"]} />
          )}
        </div>
        <div className={styles["country-card-container"]}>
          {countries.map((country) => {
            if (!isGroupStageComplete) {
              return (
                <LockedH2HCountryCard
                  key={country.fifa_rank}
                  whiteText={"Group " + country.group_letter.toUpperCase()}
                  greyText={country.position === 1 ? "Winner" : "Runner up"}
                  position={
                    `${country.group_letter.toUpperCase()}` +
                    `${country.position}`
                  }
                  group={country.group_letter}
                  positionNumber={country.position}
                />
              );
            } else {
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
            }
          })}
          {/* <H2HPageCountryCard countryName={"United States"} rank={12} abbr={"USA"} position={"A1"}/>
        <H2HPageCountryCard countryName={"United States"} rank={12} abbr={"USA"} position={"B2"}/> */}
        </div>
      </div>
    </Link>
  );
};

export default HeadToHeadCard;
