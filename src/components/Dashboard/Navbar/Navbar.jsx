import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Ustawia isAuthenticated na true, jeśli token istnieje
  }, []);

  const handleLogout = () => {
    const tokenBeforeLogout = localStorage.getItem("token");
    console.log("Token przed wylogowaniem:", tokenBeforeLogout);
    localStorage.removeItem("token");
    const tokenAfterLogout = localStorage.getItem("token");
    console.log("Token po wylogowaniu:", tokenAfterLogout);
    setIsAuthenticated(false); // Ustawia isAuthenticated na false po wylogowaniu
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      {/* Lewa strona - logo i linki */}
      <div className={`${styles.list_container} ${styles.links}`}>
        <ul className={styles.list}>
          <li>
            <img src="src/assets/logo.png" alt="drzewko" width={50} />
          </li>
          <li className={styles.item}>Input form</li>
          {/* Wyświetl "TBA" tylko gdy isAuthenticated jest true */}
          {isAuthenticated && <li className={styles.item}>TBA</li>}
        </ul>
      </div>
      {/* Prawa strona - przycisk wylogowania, wyświetlany tylko gdy isAuthenticated jest true */}
      {isAuthenticated && (
        <div className={`${styles.list_container} ${styles.icon}`}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Wyloguj
          </button>
        </div>
      )}
    </div>
  );
}
