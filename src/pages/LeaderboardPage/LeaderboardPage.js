import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import BackToProfile from "../../components/BackToProfile/BackToProfile";

import styles from "./LeaderboardPage.module.css";

const URL = process.env.REACT_APP_SERVER_URL;

const LeaderboardPage = () => {
  const [leaderboardArr, setLeaderboardArr] = useState([]);

  const teamName = useSelector((state) => state.auth.teamName);
  
  useEffect(() => {
    axios
      .get(`${URL}/leaderboard`)
      .then((res) => {
        setLeaderboardArr(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      <BackToProfile path={"/home"} backTo={"profile"} />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Leaderboard</h1>
        <div className={styles["leaderboard-container"]}>
          {leaderboardArr.map((ele, index) => {
            return (
              <div className={styles["team-container"]}>
                <p className={styles.rank}>{index + 1}</p>
                <div>
                  <p className={styles["team-name"]} style={ele.team_name === teamName ? {color: "var(--green)"} : {}}>
                    {ele.team_name > 20
                      ? ele.team_name.slice(0, 19) + "..."
                      : ele.team_name}
                  </p>
                  <p className={styles.name}>{ele.name}</p>
                </div>
                <p className={styles.points} style={ele.team_name === teamName ? {color: "var(--green)"} : {}}>{ele.score}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LeaderboardPage;
