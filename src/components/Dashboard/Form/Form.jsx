import { useState } from "react";
import { Tree } from "./Tree/Tree.jsx";
import { RootedMetrics } from "./RootedMetrics/RootedMetrics.jsx";
import { UnrootedMetrics } from "./UnrootedMetrics/UnrootedMetrics.jsx";
import { Other } from "./Other/Other.jsx";
import { Button } from "./Button/Button.jsx";

export function Form() {
  const [rootedMetrics, setRootedMetrics] = useState([]);
  const [unrootedMetrics, setUnrootedMetrics] = useState([]);
  const [comparisionMode, setcomparisionMode] = useState("");
  const [newickFirstString, setnewickFirstString] = useState(
    "Paste or drag and drop your trees in newick format separated by ;"
  );
  const [newickSecondString, setnewickSecondString] = useState(
    "Paste or drag and drop your trees in newick format separated by ;"
  );
  const [windowWidth, setwindowWidth] = useState("");

  const [normalizedDistances, setNormalizedDistances] = useState(false);
  const [pruneTrees, setPruneTrees] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(false);
  const [zeroWeightsAllowed, setZeroWeightsAllowed] = useState(false);

  const [bifurcatingTreesOnly, setBifurcatingTreesOnly] = useState(false);

  const handleOtherCheckboxChange = (optionName, value) => {
    switch (optionName) {
      case "normalizedDistances":
        setNormalizedDistances(value);
        break;
      case "pruneTrees":
        setPruneTrees(value);
        break;
      case "includeSummary":
        setIncludeSummary(value);
        break;
      case "zeroWeightsAllowed":
        setZeroWeightsAllowed(value);
        break;
      case "bifurcatingTreesOnly":
        setBifurcatingTreesOnly(value);
        break;
      default:
        break;
    }
  };

  const handleRootedChange = (commandName, isChecked) => {
    setRootedMetrics((prev) => {
      if (isChecked) {
        return [...prev, commandName];
      } else {
        return prev.filter((name) => name !== commandName);
      }
    });
  };

  const handleUnrootedChange = (commandName, isChecked) => {
    setUnrootedMetrics((prev) => {
      if (isChecked) {
        return [...prev, commandName];
      } else {
        return prev.filter((name) => name !== commandName);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const Newick = {
      comparisionMode,
      windowWidth,
      newickFirstString,
      newickSecondString,
      rootedMetrics,
      unrootedMetrics,
      normalizedDistances,
      pruneTrees,
      includeSummary,
      zeroWeightsAllowed,
      bifurcatingTreesOnly,
    };

    const token = localStorage.getItem("token");

    const runTreeCmp = () => {
      console.log("Wywoływanie endpointu /run-treecmp");

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      fetch("http://localhost:5244/api/Newick/run-treecmp", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Newick),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Odpowiedź z serwera po wywołaniu /run-treecmp:", data);
        })
        .catch((error) => {
          console.error("Błąd podczas wywoływania /run-treecmp:", error);
          alert(`Błąd: ${error.message}`);
        });
    };

    if (token) {
      console.log("Token znaleziony. Wysyłanie do endpointu dla zalogowanych.");
      fetch("http://localhost:5244/api/Newick", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(Newick),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Odpowiedź z serwera po pierwszym wywołaniu:", data);
          runTreeCmp();
        })
        .catch((error) => {
          console.error(
            "Błąd podczas wywoływania pierwszego endpointu:",
            error
          );
          alert(`Błąd: ${error.message}`);
        });
    } else {
      console.log(
        "Token nie znaleziony. Wysyłanie bez tokenu do endpointu dla niezalogowanych."
      );
      runTreeCmp();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tree
        checked={comparisionMode}
        setcomparisionMode={setcomparisionMode}
        newickFirstString={newickFirstString}
        setnewickFirstString={setnewickFirstString}
        newickSecondString={newickSecondString}
        setnewickSecondString={setnewickSecondString}
        onInputChange={setwindowWidth}
        setNormalizedDistances={setNormalizedDistances}
        setPruneTrees={setPruneTrees}
        setIncludeSummary={setIncludeSummary}
        setZeroWeightsAllowed={setZeroWeightsAllowed}
        setBifurcatingTreesOnly={setBifurcatingTreesOnly}
      />
      <RootedMetrics onCommandChange={handleRootedChange} />
      <UnrootedMetrics onCommandChange={handleUnrootedChange} />
      <Other
        normalizedDistances={normalizedDistances}
        pruneTrees={pruneTrees}
        includeSummary={includeSummary}
        zeroWeightsAllowed={zeroWeightsAllowed}
        bifurcatingTreesOnly={bifurcatingTreesOnly}
        onOptionChange={handleOtherCheckboxChange}
      />
      <Button type="submit" onClick={handleSubmit} />
    </form>
  );
}
