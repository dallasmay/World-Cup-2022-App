import BackToProfile from "../../components/BackToProfile/BackToProfile";
import BracketNav from "../../components/BracketNav/BracketNav";

import styles from "./Ro16Page.module.css";

const Ro16Page = () => {
  return (
    <>
      <BackToProfile />
      <BracketNav />
      <div className={styles["content-container"]}>
        <h1 className={styles.heading1}>Round of 16</h1>
      </div>
    </>
  );
};

export default Ro16Page;
