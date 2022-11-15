import { Link } from "react-router-dom";

import { ReactComponent as PreviousArrow } from "../../../assets/icons/PreviousArrow.svg";
import { ReactComponent as NextArrow } from "../../../assets/icons/NextArrow.svg";

import styles from "./GroupNavigationBar.module.css";

const GroupNavigationbar = ({ hasEdited, saveChangeHandler, groupLetter }) => {
  const groupLetterArr = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const index = groupLetterArr.indexOf(groupLetter)

  return (
    <div className={styles["group-navigation-bar"]}>
      <Link
        to={
          groupLetter === "a"
            ? ""
            : `/group-stage/group-${groupLetterArr[index - 1]}`
        }
      >
        <button className={styles["previous-btn"]}>
          <PreviousArrow className={styles["previous-arrow"]} />
        </button>
      </Link>
      {hasEdited ? (
        <div className={styles["save-btn-container"]}>
          <button onClick={saveChangeHandler} className={styles["save-btn"]}>
            Save changes
          </button>
        </div>
      ) : (
        <div className={styles["group-number-container"]}>
          <p className={styles["group-number-text"]}>Group</p>
          <p className={styles["group-number-number"]}>{index + 1}/8</p>
        </div>
      )}
      <Link
        to={
          groupLetter === "h"
            ? ""
            : `/group-stage/group-${groupLetterArr[index + 1]}`
        }
      >
        <button className={styles["next-btn"]}>
          <NextArrow className={styles["next-arrow"]} />
        </button>
      </Link>
    </div>
  );
};

export default GroupNavigationbar;
