import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import BackToProfile from "../../../components/BackToProfile/BackToProfile";
import OtherBracketNav from "../OtherBracketNav/OtherBracketNav";
import QfHeadToHeadCard from "../../../components/quarterfinals/QfHeadToHeadCard/QfHeadToHeadCard";
import OtherViewingBanner from "../OtherViewingBanner/OtherViewingBanner";

import styles from "./OtherFinalsPage.module.css";

const OtherFinalsPage = () => {
  const { teamName } = useParams();
  const finalsArr = useSelector((state) => state.otherBracket.finalsArr);
  const finalsWinner = useSelector((state) => state.otherBracket.finalsWinner);
  const consolationArr = useSelector((state) => state.otherBracket.consolationArr);
  const consolationWinner = useSelector(
    (state) => state.otherBracket.consolationWinner
  );
  const name = useSelector((state) => state.otherBracket.name);

  return (
    <>
      <BackToProfile
        path="/leaderboard"
        backTo="Leaderboard"
        noBottomLine={true}
      />
      <OtherBracketNav teamName={teamName} />
      <div className={styles["content-container"]}>
        <span className={styles.name}>{name}'s Bracket</span>
        <h1 className={styles.heading1}>Finals</h1>
        {finalsArr.map((match) => {
          let winner = finalsWinner.find((ele) => {
            return ele.name === match[0].name || ele.name === match[1].name;
          });
          return (
            <QfHeadToHeadCard
              key={match[2]}
              isStageComplete={true}
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
        {consolationArr.map((match) => {
          let winner = consolationWinner.find((ele) => {
            return ele.name === match[0].name || ele.name === match[1].name;
          });
          return (
            <QfHeadToHeadCard
              key={match[2]}
              isStageComplete={true}
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
      </div>
      <OtherViewingBanner />
    </>
  );
};

export default OtherFinalsPage;
