import CountryCard from "../CountryCard/CountryCard";

import styles from "./GroupSortingContainer.module.css";

const GroupSortingContainer = () => {
  return (
    <div className={styles["group-sorting-container"]}>
      <CountryCard name="USA" />
      <CountryCard name="Wales" />
      <CountryCard name="England" />
      <CountryCard name="Iran" />
    </div>
  );
};

export default GroupSortingContainer;
