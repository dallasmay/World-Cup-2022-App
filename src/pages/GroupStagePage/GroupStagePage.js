import BackToProfile from "../../components/BackToProfile/BackToProfile";
import GroupStageCard from "../../components/GroupStageCard/GroupStageCard";

import styles from "./GroupStagePage.module.css";

const GroupStagePage = () => {
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
        <GroupStageCard group="B" countryName={"Netherlands"} rank={"8"} abbr={"NED"} color={"red"}/>
      </div>
    </>
  );
}

export default GroupStagePage;