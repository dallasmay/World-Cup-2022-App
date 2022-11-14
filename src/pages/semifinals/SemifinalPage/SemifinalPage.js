import BackToProfile from "../../../components/BackToProfile/BackToProfile";
import BracketNav from "../../../components/BracketNav/BracketNav";

import styles from "./SemifinalPage.module.css";

const SemifinalPage = () => {
  return (
    <>
      <BackToProfile path={"/home"} backTo={"profile"} />
      <BracketNav />
      <h1>SemifinalPage</h1>
    </>
  );
};

export default SemifinalPage;
