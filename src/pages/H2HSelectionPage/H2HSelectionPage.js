import { useState } from "react";

import BackToProfile from "../../components/BackToProfile/BackToProfile";
import StageHeader from "../../components/StageHeader/StageHeader";

import { ReactComponent as Crown } from "../../assets/icons/Crown.svg";

import styles from "./H2HSelectionPage.module.css";

const H2HSelectionPage = ({ group }) => {
  const [isLeftActive, setIsLeftActive] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleActiveLeft = () => {
    setIsLeftActive((prevState) => {
      if (prevState === null) {
        return true
      } else if (prevState === false){
        return true
      }
    });
  };
  const toggleActiveRight = () => {
    setIsLeftActive((prevState) => {
      if (prevState === null) {
        return false;
      } else if (prevState === true){
        return false;
      }
    });
  };

  return (
    <>
      <BackToProfile path={"/ro16"} backTo={"Round of 16"} />
      <StageHeader stage={"Round of 16"} otherInfo={"Game 1 of 8"} />
      <div className={styles["content-container"]}>
        <p className={styles["game-info"]}>Game {group[2]}</p>
        <p className={styles["game-info"]}>Dec 4</p>
        <p className={styles["game-info"]}>11:00AM MDT</p>
        <div className={styles["crown-container"]}>
          <Crown
            className={styles.crown}
            style={
              isLeftActive === null
                ? {}
                : isLeftActive
                ? { visibility: "visible" }
                : {}
            }
          />
          <Crown
            className={styles.crown}
            style={
              isLeftActive === null
                ? {}
                : isLeftActive
                ? { visibility: "hidden" }
                : { visibility: "visible" }
            }
          />
        </div>
        <div className={styles["cards-container"]}>
          <button
            onClick={toggleActiveLeft}
            className={`${styles["country-card"]} ${
              isLeftActive === null
                ? "box-shadow-1px-lightgrey"
                : isLeftActive
                ? "box-shadow-2px-yellow"
                : "box-shadow-1px-lightgrey"
            }`}
            disabled={isLoading ? true : false}
          >
            <img
              src={`/1x1Flags3x/Country=${group[0].abbr}.png`}
              className={styles["flag-img"]}
            />
            <p className={styles.rank}>({group[0].fifa_rank})</p>
            <div className={styles["country-text-container"]}>
              <p className={styles["team-name"]}>{group[0].name}</p>
              <p className={styles.abbr}>{group[0].abbr}</p>
            </div>
          </button>
          <button
            onClick={toggleActiveRight}
            className={`${styles["country-card"]} ${
              isLeftActive === null
                ? "box-shadow-1px-lightgrey"
                : isLeftActive
                ? "box-shadow-1px-lightgrey"
                : "box-shadow-2px-yellow"
            }`}
            disabled={isLoading ? true : false}
          >
            <img
              src={`/1x1Flags3x/Country=${group[1].abbr}.png`}
              className={styles["flag-img"]}
            />
            <p className={styles.rank2}>({group[1].fifa_rank})</p>
            <div className={styles["country-text-container2"]}>
              <p className={styles["team-name2"]}>{group[1].name}</p>
              <p className={styles.abbr2}>{group[1].abbr}</p>
            </div>
          </button>
        </div>
        <p className={styles["select-winner"]}>Select the winner</p>
      </div>
    </>
  );
};

export default H2HSelectionPage;
