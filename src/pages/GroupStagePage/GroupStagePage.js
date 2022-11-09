import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { bracketActions } from "../../reduxStore/store";

import BackToProfile from "../../components/BackToProfile/BackToProfile";
import GroupStageCard from "../../components/GroupStageCard/GroupStageCard";

import styles from "./GroupStagePage.module.css";

const GroupStagePage = () => {
  const groupsArr = useSelector((state) => state.bracket.groupsArr);

  return (
    <>
      <BackToProfile />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Group Stage</h1>
        <div className={styles["build-bracket-info-card"]}>
          <p className={styles["build-bracket-info-card-text"]}>
            Make Group Stage predictions to gain access to future rounds
          </p>
          <div className={styles["build-bracket-btn-container"]}>
            <button className={styles["build-bracket-btn"]}>
              Build your bracket
            </button>
          </div>
        </div>
        {groupsArr.map((element) => {
          return (
            <GroupStageCard
              key={element[0].group_letter}
              groupLetter={element[0].group_letter}
              country={element}
            />
          );
        })}
      </div>
    </>
  );
};

export default GroupStagePage;
