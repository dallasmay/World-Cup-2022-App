import { NavLink } from "react-router-dom";

import styles from "./OtherBracketNav.module.css";

const OtherBracketNav = ({ teamName }) => {
  const navLinkStyles = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "var(--white)" : "var(--darkgrey)",
      color: isActive ? "var(--black)" : "var(--white)",
    };
  };

  return (
    <nav className={styles["bracket-nav"]}>
      <ul className={styles["ul"]}>
        <NavLink
          to={`/leaderboard/${teamName}/group-stage`}
          className={styles["link-li"]}
          style={navLinkStyles}
        >
          <li>Group</li>
        </NavLink>
        <NavLink
          to={`/leaderboard/${teamName}/ro16`}
          className={styles["link-li"]}
          style={navLinkStyles}
        >
          <li>Round of 16</li>
        </NavLink>
        <NavLink
          to={`/leaderboard/${teamName}/quarterfinals`}
          className={styles["link-li"]}
          style={navLinkStyles}
        >
          <li>Quarter</li>
        </NavLink>
        <NavLink
          to={`/leaderboard/${teamName}/semifinals`}
          className={styles["link-li"]}
          style={navLinkStyles}
        >
          <li>Semi</li>
        </NavLink>
        <NavLink
          to={`/leaderboard/${teamName}/finals`}
          className={styles["link-li"]}
          style={navLinkStyles}
        >
          <li>Final</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default OtherBracketNav;
