import { useSelector } from "react-redux";

import BackToProfile from "../../components/BackToProfile/BackToProfile";
import BracketNav from "../../components/BracketNav/BracketNav";
import QfHeadToHeadCard from "../../components/QfHeadToHeadCard/QfHeadToHeadCard";

import styles from "./QuarterFinalPage.module.css";

const lockedArr = [
  [
    { whiteText: "Game 49", greyText: "Winner", position: "W49" },
    { whiteText: "Game 50", greyText: "Winner", position: "W50" },
  ],
  [
    { whiteText: "Game 51", greyText: "Winner", position: "W51" },
    { whiteText: "Game 52", greyText: "Winner", position: "W52" },
  ],
  [
    { whiteText: "Game 53", greyText: "Winner", position: "W53" },
    { whiteText: "Game 54", greyText: "Winner", position: "W54" },
  ],
  [
    { whiteText: "Game 55", greyText: "Winner", position: "W55" },
    { whiteText: "Game 56", greyText: "Winner", position: "W56" },
  ],
];

const QuarterFinalPage = () => {
  const isRo16Complete = useSelector(
    (state) => state.auth.isRo16Complete
  );
  const quarterFinalsArr = useSelector(
    (state) => state.bracket.quarterFinalsArr
  );

  return (
    <>
      <BackToProfile path={"/home"} backTo={"profile"} />
      <BracketNav />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Quarterfinals</h1>
        {isRo16Complete ? (quarterFinalsArr.map((match) => {
          return (
            <QfHeadToHeadCard
              key={match[2]}
              isStageComplete={isRo16Complete}
              hasWinner={false}
              match={[match[0], match[1]]}
              game={match[2]}
              position={match[3]}
            />
          );
        })) : lockedArr.map((ele) => {
          return <QfHeadToHeadCard isStageComplete={isRo16Complete} hasWinner={false} match={[ele[0], ele[1]]} game={ele[2]}/>
        })}
      </div>
    </>
  );
};

export default QuarterFinalPage;
