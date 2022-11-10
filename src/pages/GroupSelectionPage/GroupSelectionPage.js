import { useState } from "react";

import GroupSortingContainer from "../../components/groupSelection/GroupSortingContainer/GroupSortingContainer";
import BackToProfile from "../../components/BackToProfile/BackToProfile";
import StageHeader from "../../components/StageHeader/StageHeader";
import GroupNavigationbar from "../../components/GroupNavigationBar/GroupNavigationBar";

import styles from "./GroupSelectionPage.module.css";

const GroupSelectionPage = ({ group }) => {
  const [hasEdited, setHasEdited] = useState(false);

  // const toggleHasEdited = () => {
  //   setHasEdited((prevState) => {
  //     return !prevState;
  //   })
  // }

  return (
    <>
      <BackToProfile />
      <StageHeader stage={"Group Stage"} otherInfo={"Nov 22-29"} />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Group {group[0].group_letter.toUpperCase()}</h1>
        <GroupSortingContainer group={group} setHasEdited={setHasEdited} />
        <GroupNavigationbar hasEdited={hasEdited} />
      </div>
    </>
  );
};

export default GroupSelectionPage;
