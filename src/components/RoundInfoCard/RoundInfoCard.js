import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { authActions } from "../../reduxStore/store";

import styles from "./RoundInfoCard.module.css";

const URL = process.env.REACT_APP_SERVER_URL;

const RoundInfoCard = ({ round, hasGreyText, btnPath }) => {
  const userId = useSelector((state) => state.auth.userId);
  const groupStageProgress = useSelector(
    (state) => state.auth.groupStageProgress
  );
  const dispatch = useDispatch();

  const setGroupHasSeen = () => {
    if (round === "Group Stage" && !groupStageProgress[0]) {
      let body = {
        userId,
        groupLetter: "a"
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
    <div className={styles["build-bracket-info-card"]}>
      <p className={styles["build-bracket-info-card-text"]}>
        Make {round} predictions to gain access to future rounds
      </p>
      {hasGreyText && (
        <p className={styles["build-bracket-info-card-text-grey"]}>
          We've defaulted your bracket according to FIFA ranking. Update the
          groups based on who you think will move on in the tournament.
        </p>
      )}
      <div className={styles["build-bracket-btn-container"]}>
        <Link to={btnPath} onClick={setGroupHasSeen}>
          <button className={styles["build-bracket-btn"]}>
            Build your bracket
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RoundInfoCard;