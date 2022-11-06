import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {ReactComponent as Grabber} from "../../../assets/icons/Grabber.svg"

import styles from "./CountryCard.module.css";

const CountryCard = ({ id, name, abbr }) => {
  const { setNodeRef, setActivatorNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div className={styles["country-card"]} ref={setNodeRef} style={style}>
      <div className={styles["country-info-container"]}>
        <div>
          <span className={styles["flag-container"]}></span>
        </div>
        <div className={styles["country-name"]}>
          <p className={styles["full-country-name"]}>{name}</p>
          <div className={styles["abbr-rank-container"]}>
            <h2 className={styles.heading2}>{abbr}</h2>
            <p className={styles["fifa-ranking"]}>({"14"})</p>
          </div>
        </div>
        <div>
          <Grabber
            className={styles["drag-handle"]}
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
          ></Grabber>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
