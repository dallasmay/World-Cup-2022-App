import { Link } from "react-router-dom";

import GroupStagePageCountryCard from "../GroupStagePageCountryCard/GroupStagePageCountryCard";

import { ReactComponent as LinkToGroupArrow } from "../../../assets/icons/LinkToGroupArrow.svg";

import styles from "./GroupStageCard.module.css";

const GroupStageCard = ({ groupLetter, country }) => {

  return (
    <Link to={`group-${groupLetter}`}>
      <div className={styles["group-stage-card-container"]}>
        <div className={styles["header"]}>
          <div>
            <p className={styles["group-text"]}>Group</p>
            <p className={styles["group-letter"]}>{groupLetter && groupLetter.toUpperCase()}</p>
          </div>
          <LinkToGroupArrow className={styles["arrow-icon"]} />
        </div>
        <div
          className={styles["country-card-container"]}
          style={{
            backgroundColor: `var(--${
              groupLetter === "a"
                ? "red"
                : groupLetter === "b"
                ? "yellow"
                : groupLetter === "c"
                ? "teal"
                : groupLetter === "d"
                ? "orange"
                : groupLetter === "e"
                ? "purple"
                : groupLetter === "f"
                ? "green"
                : groupLetter === "g"
                ? "blue"
                : "pink"
            })`,
          }}
        >
          {country && country.map((ele) => {
            return <GroupStagePageCountryCard key={ele?.fifa_rank} countryName={ele?.name} rank={ele?.fifa_rank} abbr={ele?.abbr}/>
          })}
        </div>
      </div>
    </Link>
  );
};

export default GroupStageCard;
