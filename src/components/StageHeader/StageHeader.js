import styles from "./StageHeader.module.css";

const StageHeader = ({ stage, otherInfo }) => {
  return (
    <div className={styles["stage-header"]}>
      <p className={styles["stage-info"]}>{stage}</p>
      <p className={styles["stage-info"]}>{otherInfo}</p>
    </div>
  );
};

export default StageHeader;
