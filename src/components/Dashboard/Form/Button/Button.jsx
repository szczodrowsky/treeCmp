import styles from "./Button.module.css";
import PropTypes from "prop-types";

export function Button({ onClick }) {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={onClick}>
        Compute
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
