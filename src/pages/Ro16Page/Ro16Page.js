import { useSelector } from "react-redux";

import BackToProfile from "../../components/BackToProfile/BackToProfile";
import BracketNav from "../../components/BracketNav/BracketNav";
import HeadToHeadCard from "../../components/HeadToHeadCard/HeadToHeadCard";

import styles from "./Ro16Page.module.css";

const Ro16Page = () => {
  const ro16Arr = useSelector((state) => state.bracket.ro16Arr);

  return (
    <>
      <BackToProfile path={"/home"} backTo={"profile"}/>
      <BracketNav />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Round of 16</h1>
        {ro16Arr.map((match) => {
          return <HeadToHeadCard key={match[2]} game={match[2]} countries={[match[0], match[1]]}/>; 
        })}
      </div>
    </>
  );
};

export default Ro16Page;
