import { useEffect, useState } from "react";
import axios from "axios";

import BackToProfile from "../../components/BackToProfile/BackToProfile";

import styles from "./LeaderboardPage.module.css";

const URL = process.env.REACT_APP_SERVER_URL;

const LeaderboardPage = () => {
  const [leaderboardArr, setLeaderboardArr] = useState([]);

  const name =
    "Diamond Dyl's Magnificent Party Pals and the basdjfslkjdfklsdflsdflsdklfjsdklf fasdjf asldkfjas;lfa sdlkfjalsk;d asdklfjasdlk;fj";

  useEffect(() => {
    axios
      .get(`${URL}/leaderboard`)
      .then((res) => {
        console.log(res)
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
                <p className={styles["team-name"]}></p>
                <div>
                  <p className={styles["team-name"]}>
                    {ele.team_name > 20
                      ? ele.team_name.slice(0, 19) + "..."
                      : ele.team_name}
                  </p>
                  <p className={styles.name}>{ele.name}</p>
                </div>
                <p className={styles.points}>{ele.score}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LeaderboardPage;
