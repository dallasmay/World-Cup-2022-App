import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { authActions } from "../../../reduxStore/store";

import GroupStagePageCountryCard from "../GroupStagePageCountryCard/GroupStagePageCountryCard";

import { ReactComponent as LinkToGroupArrow } from "../../../assets/icons/LinkToGroupArrow.svg";
import { ReactComponent as Pip } from "../../../assets/icons/Pip.svg";

import styles from "./GroupStageCard.module.css";

const URL = process.env.REACT_APP_SERVER_URL;

const GroupStageCard = ({ groupLetter, country, hasSeen }) => {
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const setGroupHasSeen = () => {
    if (!hasSeen) {
      let body = {
        userId,
        groupLetter,
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
    <Link to={`group-${groupLetter}`} onClick={setGroupHasSeen}>
      <div className={styles["group-stage-card-container"]}>
        <div className={styles["header"]}>
          <div>
            <p className={styles["group-text"]}>Group</p>
            <p className={styles["group-letter"]}>
              {groupLetter && groupLetter.toUpperCase()}
            </p>
          </div>
          {!hasSeen && <Pip className={styles.pip} />}
          <LinkToGroupArrow className={styles["arrow-icon"]} />
        </div>
        <div
          className={styles["country-card-container"]}
          style={
            hasSeen
              ? {
                  backgroundColor: `var(--${
                    groupLetter === "a"
                      ? "red"
                      : groupLetter === "b"
                      ? "yellow"
                      : groupLetter === "c"
                      ? "teal"
                      : groupLetter === "d"
                      ? "orange"
                      : groupLetter === "e"
                      ? "purple"
                      : groupLetter === "f"
                      ? "green"
                      : groupLetter === "g"
                      ? "blue"
                      : "pink"
                  })`,
                }
              : { backgroundColor: "var(--darkgrey)" }
          }
        >
          {country &&
            country.map((ele) => {
              return (
                <GroupStagePageCountryCard
                  key={ele?.fifa_rank}
                  countryName={ele?.name}
                  rank={ele?.fifa_rank}
                  abbr={ele?.abbr}
                />
              );
            })}
        </div>
      </div>
    </Link>
  );
};

export default GroupStageCard;
