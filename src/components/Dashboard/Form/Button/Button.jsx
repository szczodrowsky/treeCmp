import styles from "./Button.module.css";
import PropTypes from "prop-types";
export function Button({ onClick }) {
  return (
    <>
      <button className={styles.button} onClick={onClick}>
        Compute
      </button>
    </>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
