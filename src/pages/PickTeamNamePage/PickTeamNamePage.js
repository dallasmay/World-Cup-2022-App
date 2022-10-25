import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Button from "../../components/Button/Button";
import { ReactComponent as WCLogo } from "../../assets/icons/SoccerBallLogo.svg";

import styles from "./PickTeamNamePage.module.css";

const URL = process.env.REACT_APP_SERVER_URL;

const PickTeamNamePage = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);

  const [teamName, setTeamName] = useState("");

  const teamNameSubmitHandler = (evt) => {
    evt.preventDefault();
    let body = {
      userId,
      teamName,
    };

    axios
      .post(`${URL}/team`, body)
      .then(() => {
        console.log("Team name successfully updated");
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={styles["logo-container"]}>
        <WCLogo className={styles["wc-logo"]} />
      </div>
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Choose your team name</h1>
        <form
          onSubmit={teamNameSubmitHandler}
          className={styles["signup-form"]}
        >
          <div
            className={`${styles["input-container"]} ${styles["teamname-input-container"]}`}
          >
            <input
              type="text"
              placeholder="Team name"
              id="name-signup"
              className={styles["auth-input"]}
              onChange={(evt) => setTeamName(evt.target.value)}
            />
          </div>
          <div className={styles["next-btn-container"]}>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PickTeamNamePage;
