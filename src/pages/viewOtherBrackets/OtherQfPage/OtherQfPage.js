import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import BackToProfile from "../../../components/BackToProfile/BackToProfile";
import OtherBracketNav from "../OtherBracketNav/OtherBracketNav";
import QfHeadToHeadCard from "../../../components/quarterfinals/QfHeadToHeadCard/QfHeadToHeadCard";
import OtherViewingBanner from "../OtherViewingBanner/OtherViewingBanner";

import styles from "./OtherQfPage.module.css";

const OtherQfPage = () => {
  const { teamName } = useParams();
  const quarterFinalsArr = useSelector(
    (state) => state.otherBracket.quarterFinalsArr
  );
  const quarterFinalsWinners = useSelector(
    (state) => state.otherBracket.quarterFinalsWinners
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
        <h1 className={styles.heading1}>Quarterfinals</h1>
        {quarterFinalsArr.map((match) => {
          let winner = quarterFinalsWinners.find((ele) => {
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
              roundWinners={quarterFinalsWinners}
              path={"quarterfinals"}
            />
          );
        })}
      </div>
      <OtherViewingBanner />
    </>
  );
};

export default OtherQfPage;
