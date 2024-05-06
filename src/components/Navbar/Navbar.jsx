import styles from "./Navbar.module.css";
export function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={`${styles.list_container} ${styles.links}`}>
        <ul className={styles.list}>
          <li>
            <img src="src/assets/logo.png" alt="drzewko" width={50} />
          </li>
          <li>Home page</li>
          <li>Input form</li>
          <li>Report</li>
        </ul>
      </div>
      <div className={`${styles.list_container} ${styles.icon}`}>
        <ul className={styles.list}>
          <li className={styles.item}>Intorduction</li>
          <li className={styles.item}>Info</li>
        </ul>
      </div>
    </div>
  );
}
