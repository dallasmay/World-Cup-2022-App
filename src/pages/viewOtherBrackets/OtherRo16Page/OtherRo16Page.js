import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import BackToProfile from "../../../components/BackToProfile/BackToProfile";
import OtherBracketNav from "../OtherBracketNav/OtherBracketNav";
import OtherHeadToHeadCard from "../OtherHeadToHeadCard/OtherHeadToHeadCard";
import OtherViewingBanner from "../OtherViewingBanner/OtherViewingBanner";

import styles from "./OtherRo16Page.module.css";

const OtherRo16Page = () => {
  const { teamName } = useParams();
  const ro16Arr = useSelector((state) => state.otherBracket.ro16Arr);
  const ro16Winners = useSelector((state) => state.otherBracket.ro16Winners);
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
        <h1 className={styles.heading1}>Round of 16</h1>
        {ro16Arr.map((match) => {
          let winner = ro16Winners.find((ele) => {
            return ele.name === match[0].name || ele.name === match[1].name;
          });
          return (
            <OtherHeadToHeadCard
              key={match[2]}
              game={match[2]}
              countries={[match[0], match[1]]}
              hasWinner={winner === undefined ? undefined : true}
            />
          );
        })}
      </div>
      <OtherViewingBanner />
    </>
  );
};

export default OtherRo16Page;
