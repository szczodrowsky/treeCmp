import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewicksList.css"; // Stylizacja dla NewicksList

export function NewicksList() {
  const [newicks, setNewicks] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate(); // używamy do nawigacji

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(
          "http://localhost:5244/api/Newick/InputData",
          {
            method: "GET",
            headers: headers, // Dodajemy nagłówki do zapytania
          }
        );

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

  const addToForm = (newick) => {
    // Zapisujemy dane do sessionStorage
    sessionStorage.setItem("newickData", JSON.stringify(newick));

    // Przekazujemy dane z listy do formularza i nawigujemy do formularza
    navigate("/dashboard/"); // Nawigacja bez przekazywania danych przez state
  };

  if (error) {
    return <div>Błąd podczas pobierania danych: {error}</div>;
  }

  return (
    <div className="newicks-list">
      <h2>Lista Newicks (Historia)</h2>
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
            <th>Akcje</th>
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
              <td>{newick.rootedMetrics.join(", ")}</td>
              <td>{newick.unrootedMetrics.join(", ")}</td>
              <td>{newick.normalizedDistances ? "Yes" : "No"}</td>
              <td>{newick.pruneTrees ? "Yes" : "No"}</td>
              <td>{newick.includeSummary ? "Yes" : "No"}</td>
              <td>{newick.zeroWeightsAllowed ? "Yes" : "No"}</td>
              <td>{newick.bifurcationTreesOnly ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => addToForm(newick)}>
                  Dodaj do formularza
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
