import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleReturnToHome = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      <div className={`${styles.list_container} ${styles.links}`}>
        <ul className={styles.list}>
          <li>
            <img src="/src/assets/logo.png" alt="drzewko" width={50} />
          </li>
          <li className={styles.item}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Input form
            </NavLink>
          </li>
          {isAuthenticated && (
            <li className={styles.item}>
              <NavLink
                to="/dashboard/newicks"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Newick List
              </NavLink>
            </li>
          )}
          {isAuthenticated && (
            <li className={styles.item}>
              <NavLink
                to="/dashboard/results"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Wyniki
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      {isAuthenticated ? (
        <div className={`${styles.list_container} ${styles.icon}`}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Wyloguj
          </button>
        </div>
      ) : (
        <div className={`${styles.list_container} ${styles.icon}`}>
          <button onClick={handleReturnToHome} className={styles.logoutButton}>
            Powróć na stronę główną
          </button>
        </div>
      )}
    </div>
  );
}
