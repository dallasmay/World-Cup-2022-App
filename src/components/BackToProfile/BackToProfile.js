import { Link } from "react-router-dom";

import { ReactComponent as BackArrow } from "../../assets/icons/BackArrow.svg";

import styles from "./BackToProfile.module.css";

const BackToProfile = () => {
  return (
    <Link to="/home">
      <div className={styles["clickable-container"]}>
        <div className={styles["label-container"]}>
          <BackArrow />
          <p className={styles.label}>Back to profile</p>
        </div>
      </div>
    </Link>
  );
};

export default BackToProfile;
