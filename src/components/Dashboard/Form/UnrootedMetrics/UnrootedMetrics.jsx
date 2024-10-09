import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../../../services/axiosInstance";
import styles from "./UnrootedMetrics.module.css";

export function UnrootedMetrics({ onCommandChange }) {
  const [checkboxName, setCheckboxName] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/config")
      .then((response) => {
        const data = response.data;
        if (
          data.config.defined_metrics.metric &&
          Array.isArray(data.config.defined_metrics.metric)
        ) {
          const mappedData = data.config.defined_metrics.metric
            .filter((metric) => metric.type.includes("unrooted"))
            .map((metric) => (
              <li key={metric.id}>
                <input
                  type="checkbox"
                  id={metric.id}
                  value={metric.command_name}
                  name={metric.name}
                  onChange={(e) => {
                    onCommandChange(metric.command_name, e.target.checked);
                  }}
                />
                {metric.name}
              </li>
            ));
          setCheckboxName(mappedData);
        } else {
          console.error("Brak danych metrics w otrzymanym obiekcie JSON.");
        }
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych:", error);
      })
      .finally(() => setIsLoading(false));
  }, [onCommandChange]);

  if (isLoading) {
    return <p>Ładowanie...</p>;
  }

  return (
    <div>
      <h2>Unrooted Metrics</h2>
      <ul className={styles.list}>{checkboxName}</ul>
    </div>
  );
}

UnrootedMetrics.propTypes = {
  onCommandChange: PropTypes.func.isRequired,
};
