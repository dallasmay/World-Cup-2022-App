import GroupSortingContainer from "../../components/groupSelection/GroupSortingContainer/GroupSortingContainer";
import BackToProfile from "../../components/BackToProfile/BackToProfile";
import StageHeader from "../../components/StageHeader/StageHeader";

import styles from "./GroupSelectionPage.module.css";

const GroupSelectionPage = () => {
  return (
    <>
      <BackToProfile />
      <StageHeader stage={"Group Stage"} otherInfo={"Nov 22-29"} />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Group B</h1>
        <GroupSortingContainer />
      </div>
    </>
  );
}

export default GroupSelectionPage;