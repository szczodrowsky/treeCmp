import PropTypes from "prop-types";
import styles from "./Tree.module.css";
import { useState } from "react";

export function Tree({
  checked,
  setcomparisionMode,
  newickFirstString,
  setnewickFirstString,
  newickSecondString,
  setnewickSecondString,
  onInputChange,
  setPruneTrees,
  setIncludeSummary,
  setZeroWeightsAllowed,
  setNormalizedDistances,
}) {
  const radioButtonsFunctions = [
    { name: "Overlapping pair comparison", id: "rbOverlapping", value: "-s" },
    { name: "Window comparison", id: "rbWindow", value: "-w" },
    { name: "Matrix comparison", id: "rbMatrix", value: "-m" },
    { name: "Ref-to-all comparison", id: "rbRefToAll", value: "-r" },
  ];

  const [windowWidth, setwindowWidth] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setwindowWidth(value);
    onInputChange(value);
  };

  const handleComparisionModeChange = (value) => {
    setcomparisionMode(value);
    if (value !== "-r") {
      setnewickSecondString("");
    }
  };

  const radioButtons = radioButtonsFunctions.map((button) => (
    <li key={button.id}>
      <input
        type="radio"
        id={button.id}
        value={button.value}
        name="comparisonMode"
        onChange={(e) => handleComparisionModeChange(e.target.value)}
        checked={checked === button.value}
      />
      {button.name}
      {button.value === "-w" && checked === "-w" && (
        <input
          type="number"
          min="2"
          max="99"
          name="windowNumber"
          value={windowWidth}
          onChange={handleInputChange}
        />
      )}
    </li>
  ));

  const loadExampleData = (
    firstFilePath,
    secondFilePath = null,
    mode,
    options
  ) => {
    fetch(`${window.location.origin}${firstFilePath}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${firstFilePath}`);
        }
        return response.text();
      })
      .then((data) => setnewickFirstString(data.trim()))
      .catch((error) => console.error("Error loading first file:", error));

    if (secondFilePath) {
      fetch(`${window.location.origin}${secondFilePath}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load ${secondFilePath}`);
          }
          return response.text();
        })
        .then((data) => setnewickSecondString(data.trim()))
        .catch((error) => console.error("Error loading second file:", error));
    }

    handleComparisionModeChange(mode);
    Object.entries(options).forEach(([key, value]) => {
      if (key === "pruneTrees") setPruneTrees(value);
      if (key === "zeroWeightsAllowed") setZeroWeightsAllowed(value);
      if (key === "normalizedDistances") setNormalizedDistances(value);
      if (key === "includeSummary") setIncludeSummary(value);
    });
  };

  const exampleOne = () =>
    loadExampleData(
      "/assets/compare/tree_compare_one.txt",
      "/assets/compare/tree_compare_two.txt",
      "-r",
      {
        pruneTrees: false,
        zeroWeightsAllowed: false,
        normalizedDistances: false,
        includeSummary: true,
      }
    );

  const exampleTwo = () =>
    loadExampleData(
      "/assets/matrix_comparison/matrix_comparison_one.txt",
      null,
      "-m",
      {
        pruneTrees: true,
        zeroWeightsAllowed: true,
        normalizedDistances: false,
        includeSummary: false,
      }
    );

  const exampleThree = () =>
    loadExampleData(
      "/assets/matrix_comparison/matrix_comparison_two.txt",
      null,
      "-m",
      {
        pruneTrees: false,
        zeroWeightsAllowed: true,
        normalizedDistances: true,
        includeSummary: false,
      }
    );

  const exampleFour = () =>
    loadExampleData(
      "/assets/ref_to_all_comparison/ref_to_all_comparison_three.txt",
      "/assets/ref_to_all_comparison/ref_to_all_comparison_four.txt",
      "-r",
      {
        pruneTrees: true,
        zeroWeightsAllowed: false,
        normalizedDistances: false,
        includeSummary: true,
      }
    );

  const handleFileChange = (event, setTreeValue) => {
    const file = event.target.files[0];
    if (!file) return;
    const allowedExtensions = ["newick", "json"];

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert(
        `Unsupported file format. Please upload a file with one of the following extensions: ${allowedExtensions.join(
          ", "
        )}`
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;

      if (fileExtension === "json") {
        try {
          const jsonContent = JSON.parse(content);
          setTreeValue(jsonContent);
        } catch (error) {
          alert("Invalid JSON format");
          return;
        }
      } else {
        setTreeValue(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <h2 className={styles.comparisonModeTitle}>Comparison Mode</h2>
      <div className={styles.radioContainer}>
        <ul className={styles.list}>{radioButtons}</ul>
      </div>
      <div className={styles.areasContainer}>
        <div
          className={`${styles.area} ${
            checked !== "-r" ? styles["single-area"] : ""
          }`}
        >
          <div className={styles.inputPart}>
            <label htmlFor="file1">
              <strong>Newick trees: </strong>
            </label>
            <input type="text" name="file1" id="file1" placeholder="Untitled" />
            <input
              type="file"
              id="file1"
              onChange={(e) => handleFileChange(e, setnewickFirstString)}
            />
          </div>
          <textarea
            name="tree1"
            id="tree1"
            cols="30"
            rows="10"
            placeholder="Paste or drag Newick tree"
            value={newickFirstString}
            onChange={(e) => setnewickFirstString(e.target.value)}
          ></textarea>
        </div>
        {checked === "-r" && (
          <div className={styles.area}>
            <div className={styles.inputPart}>
              <label htmlFor="file2">
                <strong>Newick trees: </strong>
              </label>
              <input
                type="text"
                name="file2"
                id="file2"
                placeholder="Untitled"
              />
              <input
                type="file"
                id="file2"
                onChange={(e) => handleFileChange(e, setnewickSecondString)}
              />
            </div>
            <textarea
              name="tree2"
              id="tree2"
              cols="30"
              rows="10"
              placeholder="Paste or drag Newick tree"
              value={newickSecondString}
              onChange={(e) => setnewickSecondString(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>
      <div className={styles.examplesButtons}>
        <p>Examples:</p>
        <button type="button" className={styles.button} onClick={exampleOne}>
          #1
        </button>
        <button type="button" className={styles.button} onClick={exampleTwo}>
          #2
        </button>
        <button type="button" className={styles.button} onClick={exampleThree}>
          #3
        </button>
        <button type="button" className={styles.button} onClick={exampleFour}>
          #4
        </button>
      </div>
    </>
  );
}

Tree.propTypes = {
  checked: PropTypes.string.isRequired,
  setcomparisionMode: PropTypes.func.isRequired,
  newickFirstString: PropTypes.string.isRequired,
  setnewickFirstString: PropTypes.func.isRequired,
  newickSecondString: PropTypes.string.isRequired,
  setnewickSecondString: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  setPruneTrees: PropTypes.func.isRequired,
  setNormalizedDistances: PropTypes.func.isRequired,
  setIncludeSummary: PropTypes.func.isRequired,
  setZeroWeightsAllowed: PropTypes.func.isRequired,
};

export default Tree;
