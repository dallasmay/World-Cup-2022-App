import styles from "./CountryCard.module.css";

const CountryCard = ({ name }) => {
  return (
    <div className={styles["country-card"]}>
      <h1>CountryCard: {name}</h1>
    </div>
  );
};

export default CountryCard;
