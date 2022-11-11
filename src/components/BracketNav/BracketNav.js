import { NavLink } from "react-router-dom";

import styles from "./BracketNav.module.css";

const BracketNav = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "var(--white)" : "var(--darkgrey)",
      color: isActive ? "var(--black)" : "var(--white)"
    };
  };

  return (
    <nav className={styles["bracket-nav"]}>
      <ul className={styles["ul"]}>
        <NavLink
          to="/group-stage"
          className={styles["link-li"]}
          style={navLinkStyles}
        >
          <li>Group</li>
        </NavLink>
        <NavLink to="/ro16" className={styles["link-li"]} style={navLinkStyles}>
          <li>Round of 16</li>
        </NavLink>
        <NavLink
          to="/quarterfinals"
          className={styles["link-li"]}
          style={navLinkStyles}
        >
          <li>Quarter</li>
        </NavLink>
        <NavLink
          to="/semifinals"
          className={styles["link-li"]}
          style={navLinkStyles}
        >
          <li>Semi</li>
        </NavLink>
        <NavLink
          to="/finals"
          className={styles["link-li"]}
          style={navLinkStyles}
        >
          <li>Final</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default BracketNav;
