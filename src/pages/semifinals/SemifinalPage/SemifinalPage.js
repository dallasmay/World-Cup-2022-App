import { useSelector } from "react-redux";

import BackToProfile from "../../../components/BackToProfile/BackToProfile";
import BracketNav from "../../../components/BracketNav/BracketNav";
import QfHeadToHeadCard from "../../../components/quarterfinals/QfHeadToHeadCard/QfHeadToHeadCard";

import styles from "./SemifinalPage.module.css";

const lockedArr = [
  [
    { whiteText: "Game 57", greyText: "Winner", position: "W57" },
    { whiteText: "Game 58", greyText: "Winner", position: "W58" },
    61,
  ],
  [
    { whiteText: "Game 59", greyText: "Winner", position: "W59" },
    { whiteText: "Game 60", greyText: "Winner", position: "W60" },
    62,
  ],
];

const SemifinalPage = () => {
  const isQuarterFinalsComplete = useSelector(
    (state) => state.auth.isQuarterFinalsComplete
  );
  const semiFinalsArr = useSelector((state) => state.bracket.semiFinalsArr);
  const semiFinalsWinners = useSelector(
    (state) => state.bracket.semiFinalsWinners
  );
console.log(semiFinalsArr);
  return (
    <>
      <BackToProfile path={"/home"} backTo={"profile"} />
      <BracketNav />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Semifinals</h1>
        {isQuarterFinalsComplete
          ? semiFinalsArr.map((match) => {
              let winner = semiFinalsWinners.find((ele) => {
                return ele.name === match[0].name || ele.name === match[1].name;
              });
              return (
                <QfHeadToHeadCard
                  key={match[2]}
                  isStageComplete={isQuarterFinalsComplete}
                  match={[match[0], match[1]]}
                  game={match[2]}
                  position={match[3]}
                  hasWinner={winner === undefined ? undefined : true}
                  roundWinners={semiFinalsWinners}
                  path={"semifinals"}
                />
              );
            })
          : lockedArr.map((ele) => {
              return (
                <QfHeadToHeadCard
                  key={ele[2]}
                  isStageComplete={isQuarterFinalsComplete}
                  hasWinner={false}
                  match={[ele[0], ele[1]]}
                  game={ele[2]}
                />
              );
            })}
      </div>
    </>
  );
};

export default SemifinalPage;
