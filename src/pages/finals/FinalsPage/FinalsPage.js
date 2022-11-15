import { useSelector } from "react-redux";

import BackToProfile from "../../../components/BackToProfile/BackToProfile";
import BracketNav from "../../../components/BracketNav/BracketNav";
import QfHeadToHeadCard from "../../../components/quarterfinals/QfHeadToHeadCard/QfHeadToHeadCard";

import styles from "./FinalsPage.module.css";

const lockedArr = [
  [
    { whiteText: "Game 61", greyText: "Winner", position: "W61" },
    { whiteText: "Game 62", greyText: "Winner", position: "W62" },
    61,
  ],
  [
    { whiteText: "Game 61", greyText: "Loser", position: "L61" },
    { whiteText: "Game 62", greyText: "Winner", position: "L62" },
    62,
  ],
];

const FinalsPage = () => {
  const isSemiFinalsComplete = useSelector(
    (state) => state.auth.isSemiFinalsComplete
  );
  const finalsArr = useSelector((state) => state.bracket.finalsArr);
  const finalsWinner = useSelector((state) => state.bracket.finalsWinner);
  const consolationArr = useSelector((state) => state.bracket.consolationArr);
  const consolationWinner = useSelector(
    (state) => state.bracket.consolationWinner
  );

  return (
    <>
      <BackToProfile path={"/home"} backTo={"profile"} />
      <BracketNav />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Finals</h1>
        {isSemiFinalsComplete &&
          finalsArr.map((match) => {
            let winner = finalsWinner.find((ele) => {
              return ele.name === match[0].name || ele.name === match[1].name;
            });
            return (
              <QfHeadToHeadCard
                key={match[2]}
                isStageComplete={isSemiFinalsComplete}
                match={[match[0], match[1]]}
                game={match[2]}
                position={match[3]}
                hasWinner={winner === undefined ? undefined : true}
                roundWinners={finalsWinner}
                path={"finals"}
                isFinal={true}
              />
            );
          })}
        {isSemiFinalsComplete &&
          consolationArr.map((match) => {
            let winner = consolationWinner.find((ele) => {
              return ele.name === match[0].name || ele.name === match[1].name;
            });
            return (
              <QfHeadToHeadCard
                key={match[2]}
                isStageComplete={isSemiFinalsComplete}
                match={[match[0], match[1]]}
                game={match[2]}
                position={match[3]}
                hasWinner={winner === undefined ? undefined : true}
                roundWinners={consolationWinner}
                path={"finals"}
                isCons={true}
              />
            );
          })}
        {!isSemiFinalsComplete &&
          lockedArr.map((ele) => {
            return (
              <QfHeadToHeadCard
                key={ele[2]}
                isStageComplete={isSemiFinalsComplete}
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

export default FinalsPage;
