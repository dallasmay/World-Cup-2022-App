import { Link } from "react-router-dom";

import QfLockedH2HCountryCard from "../QfLockedH2HCountryCard/QfLockedH2HCountryCard";
import QfH2HPageCountryCard from "../QfH2HPageCountryCard/QfH2HPageCountryCard";

import { ReactComponent as Lock } from "../../assets/icons/Lock.svg";
import { ReactComponent as LinkArrow } from "../../assets/icons/LinkToGroupArrow.svg";
import { ReactComponent as Pip } from "../../assets/icons/Pip.svg";

import styles from "./QfHeadToHeadCard.module.css";

const QfHeadToHeadCard = ({ isStageComplete, hasWinner, match, game, position }) => {
  return (
    <Link to={"/home"}>
      <div className={styles["head-to-head-card"]}>
        <div className={styles["header"]}>
          <div>
            <p className={styles["game-text"]}>Game</p>
            <p className={styles["game-letter"]}>{game}</p>
          </div>
          {isStageComplete && hasWinner ? (
            <LinkArrow className={styles["arrow-icon"]} />
          ) : isStageComplete && !hasWinner ? (
            <>
              <Pip className={styles.pip} />
              <LinkArrow className={styles["arrow-icon"]} />
            </>
          ) : (
            <Lock className={styles["lock-icon"]} />
          )}
        </div>
        <div className={styles["country-card-container"]}>
          {isStageComplete ? match.map((country, index) => {
            return <QfH2HPageCountryCard key={country.fifa_rank} countryName={country.name} rank={country.fifa_rank} abbr={country.abbr} position={position[index]}/>
          }) : match.map((ele, index) => {
              return (
                <QfLockedH2HCountryCard
                  key={index}
                  whiteText={ele.whiteText}
                  greyText={ele.greyText}
                  position={ele.position}
                />
              );
          })        
          }
          {/* <H2HPageCountryCard countryName={"United States"} rank={12} abbr={"USA"} position={"A1"}/>
        <H2HPageCountryCard countryName={"United States"} rank={12} abbr={"USA"} position={"B2"}/> */}
        </div>
      </div>
    </Link>
  );
};

export default QfHeadToHeadCard;
