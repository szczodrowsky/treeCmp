import { useEffect, useState } from "react";
import "./MetricsDetail.css";

const MetricsDetail = () => {
  const [decodedContent, setDecodedContent] = useState("");

  useEffect(() => {
    const content = sessionStorage.getItem("metricsContent");
    setDecodedContent(content ? atob(content) : "Brak zawartości");
  }, []);

  const parseContentToTable = (content) => {
    const rows = content.trim().split("\n");
    return rows.map((row, rowIndex) => {
      const columns = row.trim().split(/\s+/);
      return (
        <tr key={rowIndex}>
          {columns.map((column, colIndex) => (
            <td
              key={colIndex}
              style={{ textAlign: colIndex === 0 ? "left" : "right" }}
            >
              {column}
            </td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div className="metrics-table-container">
      <h1 className="tittle-metrics">Metrics</h1>
      {decodedContent ? (
        <table className="metrics-table">
          <tbody>{parseContentToTable(decodedContent)}</tbody>
        </table>
      ) : (
        <p>Brak zawartości</p>
      )}
    </div>
  );
};

export default MetricsDetail;
