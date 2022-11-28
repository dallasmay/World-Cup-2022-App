import { useSelector } from "react-redux";

import { ReactComponent as Eye } from "../../../assets/icons/ViewingEye.svg";

import styles from "./OtherViewingBanner.module.css";

const OtherViewingBanner = () => {
  const name = useSelector((state) => state.otherBracket.name);

  return (
    <div className={styles["banner-container"]}>
      <Eye className={styles.eye}/>
      <p className={styles.text}>You're viewing</p>
      <p className={`${styles["bold-text"]} ${styles.text}`}>{name}'s</p>
      <p className={styles.text}>bracket</p>
    </div>
  );
};

export default OtherViewingBanner;
