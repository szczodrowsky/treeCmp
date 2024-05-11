import PropTypes from "prop-types";
import styles from "./Tree.module.css";
import { useState } from "react";

export function Tree({
  checked,
  setComandRadio,
  treeValue1,
  setTreeValue1,
  treeValue2,
  setTreeValue2,
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
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onInputChange(value);
  };
  const radioButtons = radioButtonsFunctions.map((button) => (
    <li key={button.id}>
      <input
        type="radio"
        id={button.id}
        value={button.value}
        name={button.name}
        onChange={(e) => setComandRadio(e.target.value)}
        checked={checked === button.value}
      />
      {button.name}
      {button.value === "-w" && checked === "-w" && (
        <input
          type="number"
          min="2"
          max="99"
          name="windowNumber"
          value={inputValue}
          onChange={handleInputChange}
        />
      )}
    </li>
  ));

  function exampleOne() {
    fetch("src/assets/compare/tree_compare_one.txt")
      .then((response) => response.text())
      .then((data) => setTreeValue1(data.trim()))
      .catch((error) => console.error("Error:", error));

    fetch("src/assets/compare/tree_compare_two.txt")
      .then((response) => response.text())
      .then((data) => setTreeValue2(data.trim()))
      .catch((error) => console.error("Error:", error));

    setComandRadio("-r");
    setPruneTrees(false);
    setZeroWeightsAllowed(false);
    setNormalizedDistances(false);
    setNormalizedDistances(true);
    setIncludeSummary(true);
  }

  function exampleTwo() {
    fetch("/src/assets/matrix_comparison/matrix_comparison_one.txt")
      .then((response) => response.text())
      .then((data) => setTreeValue1(data.trim()))
      .catch((error) => console.error("Error:", error));

    setComandRadio("-m");
    setNormalizedDistances(false);
    setNormalizedDistances(false);
    setIncludeSummary(false);
    setPruneTrees(true);
    setZeroWeightsAllowed(true);
  }

  function exampleThree() {
    fetch("/src/assets/matrix_comparison/matrix_comparison_two.txt")
      .then((response) => response.text())
      .then((data) => setTreeValue1(data.trim()))
      .catch((error) => console.error("Error:", error));

    setComandRadio("-m");

    setPruneTrees(false);
    setNormalizedDistances(false);
    setNormalizedDistances(true);
    setIncludeSummary(false);
    setZeroWeightsAllowed(true);
  }

  function exampleFour() {
    fetch("src/assets/ref_to_all_comparison/ref_to_all_comparison_three.txt")
      .then((response) => response.text())
      .then((data) => setTreeValue1(data.trim()))
      .catch((error) => console.error("Error:", error));

    fetch("src/assets/ref_to_all_comparison/ref_to_all_comparison_four.txt")
      .then((response) => response.text())
      .then((data) => setTreeValue2(data.trim()))
      .catch((error) => console.error("Error:", error));

    setComandRadio("-r");
    setZeroWeightsAllowed(false);
    setNormalizedDistances(false);
    setPruneTrees(true);
    setIncludeSummary(true);
    setZeroWeightsAllowed(true);
  }
  const handleFileChange = (event, setTreeValue) => {
    const file = event.target.files[0];
    if (!file) return;
    const allowedExtensions = [
      "txt",
      "nex",
      "nxs",
      "nh",
      "nhx",
      "nwk",
      "newick",
      "tre",
      "tree",
      "trees",
      "json",
    ];

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
      <ul className={styles.list}>{radioButtons}</ul>
      <div className={styles.areasContainer}>
        <div className={styles.area}>
          <div className={styles.inputPart}>
            <label htmlFor="file">
              <strong>Newick trees: </strong>
            </label>
            <input type="text" name="file1" id="file1" placeholder="Untilted" />
            <input
              type="file"
              id="file1"
              onChange={(e) => handleFileChange(e, setTreeValue1)}
            />
          </div>
          <textarea
            name="tree"
            id="tree"
            cols="30"
            rows="10"
            placeholder={treeValue1}
            value={treeValue1}
            onChange={(e) => {
              setTreeValue1(e.target.value);
            }}
          ></textarea>
        </div>
        {checked === "-r" && (
          <>
            <div className={styles.area}>
              <div className={styles.inputPart}>
                <label htmlFor="file">
                  <strong>Newick trees: </strong>
                </label>
                <input
                  type="text"
                  name="file2"
                  id="file2"
                  placeholder="Untilted"
                />
                <input
                  type="file"
                  id="file2"
                  onChange={(e) => handleFileChange(e, setTreeValue2)}
                />
              </div>
              <textarea
                name="tree"
                id="tree"
                cols="30"
                rows="10"
                placeholder={treeValue2}
                value={treeValue2}
                onChange={(e) => {
                  setTreeValue2(e.target.value);
                }}
              ></textarea>
            </div>
          </>
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
  setComandRadio: PropTypes.func.isRequired,
  treeValue1: PropTypes.string.isRequired,
  setTreeValue1: PropTypes.func.isRequired,
  treeValue2: PropTypes.string.isRequired,
  setTreeValue2: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  setPruneTrees: PropTypes.func.isRequired,
  setNormalizedDistances: PropTypes.func.isRequired,
  setIncludeSummary: PropTypes.func.isRequired,
  setZeroWeightsAllowed: PropTypes.func.isRequired,
};
