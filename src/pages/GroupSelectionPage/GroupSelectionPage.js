import GroupSortingContainer from "../../components/groupSelection/GroupSortingContainer/GroupSortingContainer";

import styles from "./GroupSelectionPage.module.css";

const GroupSelectionPage = () => {
  return (
    <>
      <div className={styles["content-container"]}>
        <h1>GroupSelectionPage</h1>
        <GroupSortingContainer />
      </div>
    </>
  );
}

export default GroupSelectionPage;