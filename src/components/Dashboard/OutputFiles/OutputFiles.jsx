import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import "./OutputFiles.css";

export function OutputFiles() {
  const [filesData, setFilesData] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/Newick/combined-newick");
        setFilesData(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const openMetricsInNewTab = (fileContent) => {
    sessionStorage.setItem("metricsContent", fileContent);
    window.open("/metrics-viewer", "_blank");
  };

  const openPhyloViewerInNewTab = (newickFirstString, newickSecondString) => {
    sessionStorage.setItem("newickFirst", newickFirstString);
    sessionStorage.setItem("newickSecond", newickSecondString);
    window.open("/phylo-viewer", "_blank");
  };

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (error) {
    return <div>Loading failed: {error}</div>;
  }

  if (filesData.length === 0) {
    return <div>No records to show.</div>;
  }

  return (
    <div className="operation-files-list">
      <h2>Output list</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>First Tree</th>
            <th>Second Tree</th>
            <th>Metrics</th>
            <th>Show Trees</th>
          </tr>
        </thead>
        <tbody>
          {filesData.map((fileData, index) => (
            <tr key={index}>
              <td>
                {new Date(fileData.fileGeneratedTimestamp).toLocaleString()}
              </td>
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
                <div>
                  <button
                    onClick={() => openMetricsInNewTab(fileData.fileContent)}
                  >
                    Open
                  </button>
                </div>
              </td>
              <td>
                <button
                  onClick={() =>
                    openPhyloViewerInNewTab(
                      fileData.newickFirstString,
                      fileData.newickSecondString
                    )
                  }
                >
                  Show
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
