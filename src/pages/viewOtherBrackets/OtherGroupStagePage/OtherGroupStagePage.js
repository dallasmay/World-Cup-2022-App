import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import BackToProfile from "../../../components/BackToProfile/BackToProfile";
import OtherBracketNav from "../OtherBracketNav/OtherBracketNav";
import GroupStageCard from "../../../components/groupStage/GroupStageCard/GroupStageCard";
import OtherViewingBanner from "../OtherViewingBanner/OtherViewingBanner";

import { authActions, otherBracketActions } from "../../../reduxStore/store";

import styles from "./OtherGroupStagePage.module.css";

const OtherGroupStagePage = () => {
  const { teamName } = useParams();
  const groupsArr = useSelector((state) => state.otherBracket.groupsArr);
  const name = useSelector((state) => state.otherBracket.name);

  return (
    <>
      <BackToProfile
        path={"/leaderboard"}
        backTo={"Leaderboard"}
        noBottomLine={true}
      />
      <OtherBracketNav teamName={teamName} />
      <div className={styles["content-container"]}>
        <span className={styles.name}>{name}'s Bracket</span>
        <h1 className={styles.heading1}>Group Stage</h1>
        {groupsArr.map((element, index) => {
          return (
            <GroupStageCard
              key={index}
              groupLetter={element[0].group_letter}
              country={element}
              hasSeen={true}
            />
          );
        })}
      </div>
      <OtherViewingBanner />
    </>
  );
};

export default OtherGroupStagePage;
