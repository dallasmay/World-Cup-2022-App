import { Link } from "react-router-dom";

import styles from "./RoundInfoCard.module.css";

const RoundInfoCard = ({ round, hasGreyText, btnPath }) => {
  return (
    <div className={styles["build-bracket-info-card"]}>
      <p className={styles["build-bracket-info-card-text"]}>
        Make {round} predictions to gain access to future rounds
      </p>
      {hasGreyText && <p className={styles["build-bracket-info-card-text-grey"]}>
        We've defaulted your bracket according to FIFA ranking. Update the
        groups based on who you think will move on in the tournament.
      </p>}
      <div className={styles["build-bracket-btn-container"]}>
        <Link to={btnPath}>
          <button className={styles["build-bracket-btn"]}>
            Build your bracket
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RoundInfoCard;