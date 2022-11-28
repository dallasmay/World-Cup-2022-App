import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import BackToProfile from "../../components/BackToProfile/BackToProfile";
import Loading from "../../components/Loading/Loading";

import { otherBracketActions, authActions } from "../../reduxStore/store";

import { ReactComponent as Caret } from "../../assets/icons/LeaderboardLinkCaret.svg";
import { ReactComponent as Refresh } from "../../assets/icons/RefreshIcon.svg";

import styles from "./LeaderboardPage.module.css";

const URL = process.env.REACT_APP_SERVER_URL;

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [leaderboardArr, setLeaderboardArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const teamName = useSelector((state) => state.auth.teamName);

  useEffect(() => {
    axios
      .get(`${URL}/leaderboard`)
      .then((res) => {
        setIsLoading(false);
        setLeaderboardArr(res.data[0].rows);
        setLastUpdated(res.data[1].rows[0].name);
      })
      .catch((err) => alert(err));
  }, []);

  const nameClickHandler = (ele) => {
    if (ele.team_name === teamName) {
      return
    }

    setIsLoading(true);

    let body = {
      teamName: ele.team_name,
    };

    axios
      .post(`${URL}/leaderboard/other-team`, body)
      .then((res) => {
        setIsLoading(false);
        dispatch(otherBracketActions.setGroupsArr(res.data[0][0].rows));
        dispatch(otherBracketActions.setRo16Arr(res.data[0][0].rows));
        dispatch(otherBracketActions.setRo16Winners(res.data[0][1].rows));
        dispatch(otherBracketActions.setQuarterFinalsArr(res.data[0][1].rows));
        dispatch(otherBracketActions.setQuarterFinalsWinners(res.data[0][2].rows));
        dispatch(otherBracketActions.setSemiFinalsArr(res.data[0][2].rows));
        dispatch(otherBracketActions.setFinalsArr(res.data[0][3].rows));
        dispatch(otherBracketActions.setConsolationArr(res.data[0][3].rows));
        dispatch(otherBracketActions.setSemiFinalsWinners(res.data[0][3].rows));
        dispatch(otherBracketActions.setName(res.data[1]));
        if (res.data[0][4].rows.length === 1) {
          if (res.data[0][4].rows[0].round === "final") {
            dispatch(
              otherBracketActions.setFinalsWinner([res.data[0][4].rows[0]])
            );
          } else if (res.data[0][4].rows[0].round === "wCons") {
            dispatch(
              otherBracketActions.setConsolationWinner([res.data[0][4].rows[0]])
            );
          }
        } else if (res.data[0][4].rows.length === 0) {
          dispatch(otherBracketActions.setConsolationWinner([]));
          dispatch(otherBracketActions.setFinalsWinner([]));
        } else {
          dispatch(
            otherBracketActions.setConsolationWinner([res.data[0][4].rows[0]])
          );
          dispatch(otherBracketActions.setFinalsWinner([res.data[0][4].rows[1]]));
        }
        navigate(`/leaderboard/${ele.team_name}/group-stage`);
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <BackToProfile path={"/home"} backTo={"profile"} noBottomLine={true} />
        <div className={styles["content-container"]}>
          <h1 className={styles.heading1}>Leaderboard</h1>
          <div className={styles["refresh-bar"]}>
            <Refresh className={styles.refresh}/>
            <p>Updated on {lastUpdated}</p>
          </div>
          <div className={styles["leaderboard-container"]}>
            {leaderboardArr.map((ele, index) => {
              return (
                <div key={index} className={styles["team-container"]}>
                  <div className={styles["flex-container"]}>
                    <p className={styles.rank}>{index + 1}</p>
                    <div
                      className={styles["names-container"]}
                      onClick={() => nameClickHandler(ele)}
                    >
                      <div className={styles["name-caret-container"]}>
                        <p
                          className={styles["team-name"]}
                          style={
                            ele.team_name === teamName
                              ? { color: "var(--green)" }
                              : {}
                          }
                        >
                          {ele.team_name.length > 20
                            ? ele.team_name.slice(0, 19) + "..."
                            : ele.team_name}
                        </p>
                        {ele.team_name === teamName ? "" : <Caret className={styles.caret} />}
                      </div>
                      <p className={styles.name}>{ele.name}</p>
                    </div>
                    <p
                      className={styles.points}
                      style={
                        ele.team_name === teamName
                          ? { color: "var(--green)" }
                          : {}
                      }
                    >
                      {ele.score}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
};

export default LeaderboardPage;
