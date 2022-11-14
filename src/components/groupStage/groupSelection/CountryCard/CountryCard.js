import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {ReactComponent as Grabber} from "../../../../assets/icons/Grabber.svg"

import styles from "./CountryCard.module.css";

const CountryCard = ({ id, name, abbr, fifa_rank }) => {
  const { setNodeRef, setActivatorNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };


  return (
    <div className={styles["country-card"]} ref={setNodeRef} style={style}>
      <div className={styles["country-info-container"]}>
        <div className={styles["flag-container"]}>
          <span
            className={styles["flag-element"]}
            style={{ backgroundImage: `url(/1x1Flags/Country=${abbr}.png)` }}
          ></span>
        </div>
        <div className={styles["country-name"]}>
          <p className={styles["full-country-name"]}>{name}</p>
          <div className={styles["abbr-rank-container"]}>
            <h2 className={styles.heading2}>{abbr}</h2>
            <p className={styles["fifa-ranking"]}>({fifa_rank})</p>
          </div>
        </div>
        <div
          className={styles["drag-handle-container"]}
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
        >
          <Grabber className={styles["drag-handle"]}></Grabber>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
