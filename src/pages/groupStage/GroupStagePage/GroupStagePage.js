import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { bracketActions } from "../../../reduxStore/store";

import BackToProfile from "../../../components/BackToProfile/BackToProfile";
import BracketNav from "../../../components/BracketNav/BracketNav";
import GroupStageCard from "../../../components/groupStage/GroupStageCard/GroupStageCard";
import RoundInfoCard from "../../../components/RoundInfoCard/RoundInfoCard";
import LockBanner from "../../../components/LockBanner/LockBanner";

import styles from "./GroupStagePage.module.css";

const GroupStagePage = () => {
  const groupsArr = useSelector((state) => state.bracket.groupsArr);
  const isGroupStageComplete = useSelector(
    (state) => state.auth.isGroupStageComplete
  );
  const groupStageProgress = useSelector(
    (state) => state.auth.groupStageProgress
  );
  return (
    <>
      <BackToProfile path={"/home"} backTo={"profile"} noBottomLine={true}/>
      <BracketNav />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Group Stage</h1>
        {!isGroupStageComplete && (
          <RoundInfoCard
            round={"Group Stage"}
            hasGreyText={true}
            btnPath={"/group-stage/group-a"}
          />
        )}
        {groupsArr.map((element, index) => {
          return (
            <GroupStageCard
              key={index}
              groupLetter={element[0].group_letter}
              country={element}
              hasSeen={groupStageProgress[index]}
            />
          );
        })}
      </div>
      <LockBanner />
    </>
  );
};

export default GroupStagePage;
