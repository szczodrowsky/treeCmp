import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import "./NewicksList.css";

export function NewicksList() {
  const [newicks, setNewicks] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/Newick/InputData");
        setNewicks(response.data);
        console.log(response.data);
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
    sessionStorage.setItem("newickData", JSON.stringify(newick));
    navigate("/dashboard/");
  };

  if (error) {
    return <div>Failed during fetch {error}</div>;
  }

  return (
    <div className="newicks-list">
      <h2>Last Operations</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
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
              <td>{new Date(newick.timestamp).toLocaleString()}</td>
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
                <button onClick={() => addToForm(newick)}>Add to form</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
