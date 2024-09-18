import { useEffect, useState } from "react";
import "./NewicksList.css"; // Import stylizacji CSS

export function NewicksList() {
  const [newicks, setNewicks] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({}); // Stan do przechowywania rozwiniętych wierszy

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5244/api/Newick"); // Zakładany endpoint
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setNewicks(data); // Zakłada się, że dane są w formacie JSON i są tablicą
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (error) {
    return <div>Błąd podczas pobierania danych: {error}</div>;
  }

  return (
    <div className="newicks-list">
      <h2>Lista Newicks</h2>
      <table>
        <thead>
          <tr>
            <th>Comparision Mode</th>
            <th>Newick First String</th>
            <th>Newick Second String</th>
            <th>Window Width</th>
            <th>Rooted Metrics</th>
            <th>Unrooted Metrics</th>
            <th>Normalized Distances</th>
            <th>Prune Trees</th>
            <th>Include Summary</th>
            <th>Zero Weights Allowed</th>
            <th>Bifurcation Trees Only</th>
          </tr>
        </thead>
        <tbody>
          {newicks.map((newick, index) => (
            <tr key={index}>
              <td>{newick.comparisionMode}</td>
              <td>
                <div
                  className={`expandable-content ${
                    expandedRows[index] ? "expanded" : ""
                  }`}
                >
                  {newick.newickFirstString}
                </div>
                {newick.newickFirstString.length > 50 && (
                  <button
                    className="expand-button"
                    onClick={() => toggleRow(index)}
                  >
                    {expandedRows[index] ? "Zwiń" : "Rozwiń"}
                  </button>
                )}
              </td>
              <td>
                <div
                  className={`expandable-content ${
                    expandedRows[index] ? "expanded" : ""
                  }`}
                >
                  {newick.newickSecondString}
                </div>
                {newick.newickSecondString.length > 50 && (
                  <button
                    className="expand-button"
                    onClick={() => toggleRow(index)}
                  >
                    {expandedRows[index] ? "Zwiń" : "Rozwiń"}
                  </button>
                )}
              </td>
              <td>{newick.windowWidth}</td>
              <td>{newick.rootedMetrics}</td>
              <td>{newick.unrootedMetrics}</td>
              <td>{newick.normalizedDistances}</td>
              <td>{newick.pruneTrees}</td>
              <td>{newick.includeSummary}</td>
              <td>{newick.zeroWeightsAllowed}</td>
              <td>{newick.bifurcationTreesOnly}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
