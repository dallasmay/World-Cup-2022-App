import BackToProfile from "../../components/BackToProfile/BackToProfile";
import BracketNav from "../../components/BracketNav/BracketNav";

import styles from "./QuarterFinalPage.module.css";

const QuarterFinalPage = () => {
  return (
    <>
      <BackToProfile path={"/home"} backTo={"profile"}/>
      <BracketNav />
      <h1>QuarterFinalPage</h1>
    </>
  );
}

export default QuarterFinalPage;