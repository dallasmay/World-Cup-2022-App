import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { authActions } from "../../../reduxStore/store";

import { ReactComponent as PreviousArrow } from "../../../assets/icons/PreviousArrow.svg";
import { ReactComponent as NextArrow } from "../../../assets/icons/NextArrow.svg";

import styles from "./GroupNavigationBar.module.css";

const URL = process.env.REACT_APP_SERVER_URL;

const GroupNavigationbar = ({ hasEdited, saveChangeHandler, groupLetter }) => {
  const groupLetterArr = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const index = groupLetterArr.indexOf(groupLetter);

  const userId = useSelector((state) => state.auth.userId);
  const groupStageProgress = useSelector(
    (state) => state.auth.groupStageProgress
  );
  const dispatch = useDispatch();
  
  const setGroupHasSeenLeft = () => {
    if (groupLetter === "a") {
      return
    };
    const hasSeen = groupStageProgress[index - 1]

    if (!hasSeen) {
      let body = {
        userId,
        groupLetter: groupLetterArr[index - 1],
      };

      axios
        .post(`${URL}/bracket/group/set-as-seen`, body)
        .then((res) => {
          dispatch(
            authActions.setGroupStageProgress([
              res.data[0].a_is_seen,
              res.data[0].b_is_seen,
              res.data[0].c_is_seen,
              res.data[0].d_is_seen,
              res.data[0].e_is_seen,
              res.data[0].f_is_seen,
              res.data[0].g_is_seen,
              res.data[0].h_is_seen,
            ])
          );
          if (
            res.data[0].a_is_seen &&
            res.data[0].b_is_seen &&
            res.data[0].c_is_seen &&
            res.data[0].d_is_seen &&
            res.data[0].e_is_seen &&
            res.data[0].f_is_seen &&
            res.data[0].g_is_seen &&
            res.data[0].h_is_seen
          ) {
            dispatch(authActions.setisGroupStageComplete(true));
          }
        })
        .catch((err) => alert("Server Error"));
    }
  };

  const setGroupHasSeenRight = () => {
    if (groupLetter === "h") {
      return;
    }
    const hasSeen = groupStageProgress[index + 1];

    if (!hasSeen) {
      let body = {
        userId,
        groupLetter: groupLetterArr[index + 1],
      };

      axios
        .post(`${URL}/bracket/group/set-as-seen`, body)
        .then((res) => {
          dispatch(
            authActions.setGroupStageProgress([
              res.data[0].a_is_seen,
              res.data[0].b_is_seen,
              res.data[0].c_is_seen,
              res.data[0].d_is_seen,
              res.data[0].e_is_seen,
              res.data[0].f_is_seen,
              res.data[0].g_is_seen,
              res.data[0].h_is_seen,
            ])
          );
          if (
            res.data[0].a_is_seen &&
            res.data[0].b_is_seen &&
            res.data[0].c_is_seen &&
            res.data[0].d_is_seen &&
            res.data[0].e_is_seen &&
            res.data[0].f_is_seen &&
            res.data[0].g_is_seen &&
            res.data[0].h_is_seen
          ) {
            dispatch(authActions.setisGroupStageComplete(true));
          }
        })
        .catch((err) => alert("Server Error"));
    }
  };

  return (
    <div className={styles["group-navigation-bar"]}>
      <Link
        to={
          groupLetter === "a"
            ? ""
            : `/group-stage/group-${groupLetterArr[index - 1]}`
        }
        onClick={setGroupHasSeenLeft}
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
        onClick={setGroupHasSeenRight}
      >
        <button className={styles["next-btn"]}>
          <NextArrow className={styles["next-arrow"]} />
        </button>
      </Link>
    </div>
  );
};

export default GroupNavigationbar;
