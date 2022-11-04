import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import styles from "./CountryCard.module.css";

const CountryCard = ({ id, name }) => {
  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className={styles["country-card"]}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <h1>CountryCard: {name}</h1>
    </div>
  );
};

export default CountryCard;
