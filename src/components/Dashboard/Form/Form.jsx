import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tree } from "./Tree/Tree.jsx";
import { RootedMetrics } from "./RootedMetrics/RootedMetrics.jsx";
import { UnrootedMetrics } from "./UnrootedMetrics/UnrootedMetrics.jsx";
import { Other } from "./Other/Other.jsx";
import { Button } from "./Button/Button.jsx";

export function Form() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("newickData");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const initialDataFromStorage = sessionStorage.getItem("newickData")
    ? JSON.parse(sessionStorage.getItem("newickData"))
    : null;

  const [rootedMetrics, setRootedMetrics] = useState(
    initialDataFromStorage?.rootedMetrics || []
  );
  const [unrootedMetrics, setUnrootedMetrics] = useState(
    initialDataFromStorage?.unrootedMetrics || []
  );
  const [comparisionMode, setComparisionMode] = useState(
    initialDataFromStorage?.comparisionMode || ""
  );
  const [newickFirstString, setNewickFirstString] = useState(
    initialDataFromStorage?.newickFirstString ||
      "Paste or drag and drop your trees in newick format separated by ;"
  );
  const [newickSecondString, setNewickSecondString] = useState(
    initialDataFromStorage?.newickSecondString ||
      "Paste or drag and drop your trees in newick format separated by ;"
  );
  const [windowWidth, setWindowWidth] = useState(
    initialDataFromStorage?.windowWidth || ""
  );

  const [normalizedDistances, setNormalizedDistances] = useState(
    initialDataFromStorage?.normalizedDistances || false
  );
  const [pruneTrees, setPruneTrees] = useState(
    initialDataFromStorage?.pruneTrees || false
  );
  const [includeSummary, setIncludeSummary] = useState(
    initialDataFromStorage?.includeSummary || false
  );
  const [zeroWeightsAllowed, setZeroWeightsAllowed] = useState(
    initialDataFromStorage?.zeroWeightsAllowed || false
  );
  const [bifurcatingTreesOnly, setBifurcatingTreesOnly] = useState(
    initialDataFromStorage?.bifurcatingTreesOnly || false
  );

  useEffect(() => {
    const formData = {
      rootedMetrics,
      unrootedMetrics,
      comparisionMode,
      newickFirstString,
      newickSecondString,
      windowWidth,
      normalizedDistances,
      pruneTrees,
      includeSummary,
      zeroWeightsAllowed,
      bifurcatingTreesOnly,
    };
    sessionStorage.setItem("newickData", JSON.stringify(formData));
  }, [
    rootedMetrics,
    unrootedMetrics,
    comparisionMode,
    newickFirstString,
    newickSecondString,
    windowWidth,
    normalizedDistances,
    pruneTrees,
    includeSummary,
    zeroWeightsAllowed,
    bifurcatingTreesOnly,
  ]);

  const resetForm = () => {
    setRootedMetrics([]);
    setUnrootedMetrics([]);
    setComparisionMode("");
    setNewickFirstString(
      "Paste or drag and drop your trees in newick format separated by ;"
    );
    setNewickSecondString(
      "Paste or drag and drop your trees in newick format separated by ;"
    );
    setWindowWidth("");
    setNormalizedDistances(false);
    setPruneTrees(false);
    setIncludeSummary(false);
    setZeroWeightsAllowed(false);
    setBifurcatingTreesOnly(false);

    // Usuwanie danych z sessionStorage
    sessionStorage.removeItem("newickData");
  };

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

    const runTreeCmp = (operationId) => {
      console.log("Wywoływanie endpointu /run-treecmp");

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      let url = "http://localhost:5244/api/Newick/run-treecmp";

      if (operationId) {
        url += `?operationId=${operationId}`;
      }

      fetch(url, {
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
          const { operationId } = data;
          runTreeCmp(operationId);
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
        setcomparisionMode={setComparisionMode}
        newickFirstString={newickFirstString}
        setnewickFirstString={setNewickFirstString}
        newickSecondString={newickSecondString}
        setnewickSecondString={setNewickSecondString}
        onInputChange={setWindowWidth}
        setNormalizedDistances={setNormalizedDistances}
        setPruneTrees={setPruneTrees}
        setIncludeSummary={setIncludeSummary}
        setZeroWeightsAllowed={setZeroWeightsAllowed}
        setBifurcatingTreesOnly={setBifurcatingTreesOnly}
      />
      <RootedMetrics
        metrics={rootedMetrics}
        onCommandChange={handleRootedChange}
      />
      <UnrootedMetrics
        metrics={unrootedMetrics}
        onCommandChange={handleUnrootedChange}
      />
      <Other
        normalizedDistances={normalizedDistances}
        pruneTrees={pruneTrees}
        includeSummary={includeSummary}
        zeroWeightsAllowed={zeroWeightsAllowed}
        bifurcatingTreesOnly={bifurcatingTreesOnly}
        onOptionChange={handleOtherCheckboxChange}
      />
      <Button type="submit" onClick={handleSubmit} />
      <button type="button" onClick={resetForm}>
        Resetuj formularz
      </button>{" "}
    </form>
  );
}

Form.propTypes = {
  initialData: PropTypes.shape({
    comparisionMode: PropTypes.string,
    newickFirstString: PropTypes.string,
    newickSecondString: PropTypes.string,
    windowWidth: PropTypes.string,
    rootedMetrics: PropTypes.arrayOf(PropTypes.string),
    unrootedMetrics: PropTypes.arrayOf(PropTypes.string),
    normalizedDistances: PropTypes.bool,
    pruneTrees: PropTypes.bool,
    includeSummary: PropTypes.bool,
    zeroWeightsAllowed: PropTypes.bool,
    bifurcatingTreesOnly: PropTypes.bool,
  }),
};

Form.defaultProps = {
  initialData: null,
};
