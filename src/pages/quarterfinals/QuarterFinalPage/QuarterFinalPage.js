import { useSelector } from "react-redux";

import BackToProfile from "../../../components/BackToProfile/BackToProfile";
import BracketNav from "../../../components/BracketNav/BracketNav";
import QfHeadToHeadCard from "../../../components/quarterfinals/QfHeadToHeadCard/QfHeadToHeadCard";

import styles from "./QuarterFinalPage.module.css";

const lockedArr = [
  [
    { whiteText: "Game 49", greyText: "Winner", position: "W49" },
    { whiteText: "Game 50", greyText: "Winner", position: "W50" },
    57,
  ],
  [
    { whiteText: "Game 51", greyText: "Winner", position: "W51" },
    { whiteText: "Game 52", greyText: "Winner", position: "W52" },
    59,
  ],
  [
    { whiteText: "Game 53", greyText: "Winner", position: "W53" },
    { whiteText: "Game 54", greyText: "Winner", position: "W54" },
    58,
  ],
  [
    { whiteText: "Game 55", greyText: "Winner", position: "W55" },
    { whiteText: "Game 56", greyText: "Winner", position: "W56" },
    60,
  ],
];

const QuarterFinalPage = () => {
  const isRo16Complete = useSelector((state) => state.auth.isRo16Complete);
  const quarterFinalsArr = useSelector(
    (state) => state.bracket.quarterFinalsArr
  );
  const quarterFinalsWinners = useSelector(
    (state) => state.bracket.quarterFinalsWinners
  );

  return (
    <>
      <BackToProfile path={"/home"} backTo={"profile"} />
      <BracketNav />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Quarterfinals</h1>
        {isRo16Complete
          ? quarterFinalsArr.map((match) => {
              let winner = quarterFinalsWinners.find((ele) => {
                return ele.name === match[0].name || ele.name === match[1].name;
              });
              return (
                <QfHeadToHeadCard
                  key={match[2]}
                  isStageComplete={isRo16Complete}
                  match={[match[0], match[1]]}
                  game={match[2]}
                  position={match[3]}
                  hasWinner={winner === undefined ? undefined : true}
                />
              );
            })
          : lockedArr.map((ele) => {
              return (
                <QfHeadToHeadCard
                  key={ele[2]}
                  isStageComplete={isRo16Complete}
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

export default QuarterFinalPage;
