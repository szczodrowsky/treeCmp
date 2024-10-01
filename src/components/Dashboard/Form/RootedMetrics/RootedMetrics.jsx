import styles from "./RootedMetrics.module.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function RootedMetrics({ onCommandChange }) {
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5244/config")
      .then((res) => res.json())
      .then((data) => {
        if (
          data.config.defined_metrics.metric &&
          Array.isArray(data.config.defined_metrics.metric)
        ) {
          const mappedData = data.config.defined_metrics.metric
            .filter((metric) => metric.type.includes("first"))
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
          setCheckboxValues(mappedData);
          setIsLoading(false);
        } else {
          console.error("Brak danych metrics w otrzymanym obiekcie JSON.");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych:", error);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <p>Ładowanie</p>;
  }

  return (
    <div>
      <h1>Rooted Metrics</h1>
      <ul className={styles.list}>{checkboxValues}</ul>
    </div>
  );
}
RootedMetrics.propTypes = {
  onCommandChange: PropTypes.func.isRequired,
};
