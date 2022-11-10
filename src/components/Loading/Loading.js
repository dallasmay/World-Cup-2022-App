import { ReactComponent as Spinner } from "../../assets/icons/LoadingSoccer.svg";
import { ReactComponent as Words } from "../../assets/icons/LogoWords.svg";


import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <>
      <div className={styles["spinner-container"]}>
        <Spinner className={styles.spinner} />
      </div>
      {/* <div className={styles["words-container"]}>
        <Words className={styles} />
      </div> */}
    </>
  );
};

export default Loading;
