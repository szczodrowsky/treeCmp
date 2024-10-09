import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tree } from "./Tree/Tree.jsx";
import { RootedMetrics } from "./RootedMetrics/RootedMetrics.jsx";
import { UnrootedMetrics } from "./UnrootedMetrics/UnrootedMetrics.jsx";
import { Other } from "./Other/Other.jsx";
import { Button } from "./Button/Button.jsx";
import { LoadingAnimation } from "./LoadingAnimation/LoadingAnimation";
import axiosInstance from "../../../services/axiosInstance";
import styles from "./Form.module.css";
import { ErrorMessage } from "./ErrorMessage/ErrorMessage.jsx";

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
  const [isRooted, setIsRooted] = useState(false);
  const [isUnrooted, setIsUnrooted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
      const newRootedMetrics = isChecked
        ? [...prev, commandName]
        : prev.filter((name) => name !== commandName);
      setIsRooted(newRootedMetrics.length > 0);
      return newRootedMetrics;
    });
  };

  const handleUnrootedChange = (commandName, isChecked) => {
    setUnrootedMetrics((prev) => {
      const newUnrootedMetrics = isChecked
        ? [...prev, commandName]
        : prev.filter((name) => name !== commandName);
      setIsUnrooted(newUnrootedMetrics.length > 0);
      return newUnrootedMetrics;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isRooted && !isUnrooted) {
      setError("Przynajmniej jedno z Rooted lub Unrooted musi być zaznaczone.");
      return;
    }
    setError("");
    setLoading(true);

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

    const openPhyloViewerInNewTab = () => {
      sessionStorage.setItem("newickFirst", newickFirstString);
      sessionStorage.setItem("newickSecond", newickSecondString);
      window.open("/phylo-viewer", "_blank");
    };

    const openMetricsInNewTab = (fileContent) => {
      sessionStorage.setItem("metricsContent", fileContent);
      window.open("/metrics-viewer", "_blank");
    };

    const runTreeCmp = async (operationId) => {
      let url = "/Newick/run-treecmp";
      if (operationId) {
        url += `?operationId=${operationId}`;
      }
      try {
        const response = await axiosInstance.post(url, Newick);
        openPhyloViewerInNewTab();
        openMetricsInNewTab(response.data.fileContent);
      } catch (error) {
        console.error("Error in /run-treecmp:", error);
        alert(`Error: ${error.message}`);
      } finally {
        setLoading(false);
        sessionStorage.removeItem("newickFirst");
        sessionStorage.removeItem("newickSecond");
        console.log("Newick strings cleared from session storage.");
      }
    };

    try {
      if (token) {
        const response = await axiosInstance.post("/Newick/newick-db", Newick, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { operationId } = response.data;
        runTreeCmp(operationId);
      } else {
        runTreeCmp();
      }
    } catch (error) {
      console.error("Error in /newick-db:", error);
      alert(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingAnimation />}
      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
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
        </div>
        <div className={styles.formSection}>
          <RootedMetrics
            metrics={rootedMetrics}
            onCommandChange={handleRootedChange}
          />
        </div>
        <div className={styles.formSection}>
          <UnrootedMetrics
            metrics={unrootedMetrics}
            onCommandChange={handleUnrootedChange}
          />
        </div>
        <div className={styles.formSection}>
          <Other
            normalizedDistances={normalizedDistances}
            pruneTrees={pruneTrees}
            includeSummary={includeSummary}
            zeroWeightsAllowed={zeroWeightsAllowed}
            bifurcatingTreesOnly={bifurcatingTreesOnly}
            onOptionChange={handleOtherCheckboxChange}
          />
        </div>
        <ErrorMessage message={error} />{" "}
        <Button type="submit" onClick={handleSubmit} />
      </form>
    </>
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
