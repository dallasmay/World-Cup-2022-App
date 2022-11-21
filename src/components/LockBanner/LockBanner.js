import useTimer from "../../hooks/useTimer";

import { ReactComponent as Lock } from "../../assets/icons/BannerLock.svg";

import styles from "./LockBanner.module.css";

const LockBanner = () => {
  const { hours, minutes, seconds } = useTimer("2022-11-20T23:59:59");
  const timezone = new Date().getTimezoneOffset() / 60;

  return (
    <div className={styles["banner-container"]}>
      <Lock />
      <p className={styles.text}>Brackets lock {timezone === 7 ? "in" : "at"}</p>
      <p className={styles["bold-text"]} style={timezone === 7 ? {width: "9.2rem"} : {width: "13rem"}}>{timezone === 7 ? `${hours}h ${minutes}m ${seconds}s` : "11:59pm MST 11/20"}</p>
    </div>
  );
};

export default LockBanner;