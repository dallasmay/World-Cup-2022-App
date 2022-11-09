import { Link } from "react-router-dom";

import GroupStagePageCountryCard from "../GroupStagePageCountryCard/GroupStagePageCountryCard";

import { ReactComponent as LinkToGroupArrow } from "../../assets/icons/LinkToGroupArrow.svg";

import styles from "./GroupStageCard.module.css";

const GroupStageCard = ({ group, countryName, rank, abbr, color }) => {
  return (
    <Link to={`group-${group}`}>
      <div className={styles["group-stage-card-container"]}>
        <div className={styles["header"]}>
          <div>
            <p className={styles["group-text"]}>Group</p>
            <p className={styles["group-letter"]}>{group}</p>
          </div>
          <LinkToGroupArrow className={styles["arrow-icon"]} />
        </div>
        <div
          className={styles["country-card-container"]}
          style={{ backgroundColor: `var(--${color})` }}
        >
          <GroupStagePageCountryCard
            countryName={countryName}
            rank={rank}
            abbr={abbr}
          />
          <GroupStagePageCountryCard
            countryName={countryName}
            rank={rank}
            abbr={abbr}
          />
          <GroupStagePageCountryCard
            countryName={countryName}
            rank={rank}
            abbr={abbr}
          />
          <GroupStagePageCountryCard
            countryName={countryName}
            rank={rank}
            abbr={abbr}
          />
        </div>
      </div>
    </Link>
  );
};

export default GroupStageCard;
