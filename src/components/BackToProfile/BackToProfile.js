import { Link } from "react-router-dom";

import { ReactComponent as BackArrow } from "../../assets/icons/BackArrow.svg";

import styles from "./BackToProfile.module.css";

const BackToProfile = ({ path, backTo, noBottomLine }) => {
  return (
    <Link to={path}>
      <div className={styles["clickable-container"]} style={noBottomLine ? {borderBottom: "none"} : {}}>
        <div className={styles["label-container"]}>
          <BackArrow />
          <p className={styles.label}>Back to {backTo}</p>
        </div>
      </div>
    </Link>
  );
};

export default BackToProfile;
