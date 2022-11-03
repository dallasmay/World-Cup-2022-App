import { Link } from "react-router-dom";

import styles from "./GroupStageCard.module.css";

const GroupStageCard = ({ group }) => {
  return (
    <Link to={`group-${group}`}>
      <h1>GroupStageCard - Group {group}</h1>
    </Link>
  );
};

export default GroupStageCard;
