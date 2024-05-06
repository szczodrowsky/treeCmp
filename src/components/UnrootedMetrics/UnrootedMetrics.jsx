import styles from "./UnrootedMetrics.module.css";
import { useEffect, useState } from "react";
export function UnrootedMetrics() {
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((data) => {
        console.log("Otrzymane dane:", data);
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
    <>
      <div>
        <h2>Unrooted metrics</h2>
        <ul className={styles.list}>{checkboxValues}</ul>
      </div>
    </>
  );
}
