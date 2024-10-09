import PropTypes from "prop-types";
import { FaExclamationCircle } from "react-icons/fa";
import styles from "./ErrorMessage.module.css";

export function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className={styles.errorMessageContainer}>
      <div className={styles.errorMessageWrapper}>
        <FaExclamationCircle className={styles.errorMessageIcon} />
        <span>{message}</span>
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: "",
};
