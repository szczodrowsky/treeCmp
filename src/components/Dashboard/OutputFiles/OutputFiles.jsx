import { useEffect, useState } from "react";
import "./OutputFiles.css";

export function OutputFiles() {
  const [filesData, setFilesData] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

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
          "http://localhost:5244/api/Newick/combined-newick",
          {
            method: "GET",
            headers: headers,
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("Odpowiedź z backendu:", data);
        setFilesData(data);
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
    <div className="operation-files-list">
      <h2>Lista Plików Operacyjnych</h2>
      <table>
        <thead>
          <tr>
            <th>Newick First String</th>
            <th>Newick Second String</th>
            <th>Output File</th>
          </tr>
        </thead>
        <tbody>
          {filesData.map((fileData, index) => (
            <tr key={index}>
              <td>
                <div
                  className={`expandable-content ${
                    expandedRows[index] ? "expanded" : ""
                  }`}
                >
                  {fileData.newickFirstString}
                </div>
                {fileData.newickFirstString.length > 50 && (
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
                  {fileData.newickSecondString}
                </div>
                {fileData.newickSecondString.length > 50 && (
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
                  {fileData.fileContent || "Brak zawartości"}{" "}
                </div>
                {fileData.fileContent && fileData.fileContent.length > 50 && (
                  <button
                    className="expand-button"
                    onClick={() => toggleRow(index)}
                    aria-label={`Rozwiń lub zwiń zawartość wiersza ${
                      index + 1
                    }`}
                  >
                    {expandedRows[index] ? "Zwiń" : "Rozwiń"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
