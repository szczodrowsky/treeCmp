import { useState } from "react";
import styles from "./Tree.module.css";
export function Tree() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [checked, setChecked] = useState(null);
  const [treeValue1, setTreeValue1] = useState(
    "Paste or drag and drop your trees in newick format separated by ;"
  );
  const [treeValue2, setTreeValue2] = useState(
    "Paste or drag and drop your trees in newick format separated by ;"
  );
  const radioButtonsFunctions = [
    { name: "Overlapping pair comparison", id: "rbOverlapping", value: "-s" },
    { name: "Window comparison", id: "rbWindow", value: "-w" },
    { name: "Matrix comparison", id: "rbMatrix", value: "-m" },
    { name: "Ref-to-all comparison", id: "rbRefToAll", value: "-r" },
  ];
  const radioButtons = radioButtonsFunctions.map((button) => (
    <li key={button.id}>
      <input
        type="radio"
        id={button.id}
        value={button.value}
        name={button.name}
        onChange={(e) => setChecked(e.target.value)}
        checked={checked === button.value}
      />
      {button.name}
      {button.name === "Window comparison" &&
        checked === "Window comparison" && (
          <input
            type="number"
            min="2"
            max="99"
            value={windowWidth}
            onChange={(prevWidth) => setWindowWidth(prevWidth.target.value)}
            name="windowWidth"
          />
        )}
    </li>
  ));

  function exampleOne() {
    fetch("src/assets/compare/tree_compare_one.txt")
      .then((response) => response.text())
      .then((data) => {
        setTreeValue1(data.trim());
      })
      .catch((error) => console.error("Błąd:", error));

    fetch("src/assets/compare/tree_compare_two.txt")
      .then((response) => response.text())
      .then((data) => {
        setTreeValue2(data.trim());
      })
      .catch((error) => console.error("Błąd:", error));

    setChecked("-r");
  }
  function exampleTwo() {
    fetch("/src/assets/matrix_comparison/matrix_comparison_one.txt")
      .then((response) => response.text())
      .then((data) => {
        setTreeValue1(data.trim());
      })
      .catch((error) => console.error("Błąd:", error));

    setChecked("-m");
  }
  function exampleThree() {
    fetch("/src/assets/matrix_comparison/matrix_comparison_two.txt")
      .then((response) => response.text())
      .then((data) => {
        setTreeValue1(data.trim());
      })
      .catch((error) => console.error("Błąd:", error));

    setChecked("-m");
  }
  function exampleFour() {
    fetch("src/assets/ref_to_all_comparison/ref_to_all_comparison_three.txt")
      .then((response) => response.text())
      .then((data) => {
        setTreeValue1(data.trim());
      })
      .catch((error) => console.error("Błąd:", error));

    fetch("src/assets/ref_to_all_comparison/ref_to_all_comparison_four.txt")
      .then((response) => response.text())
      .then((data) => {
        setTreeValue2(data.trim());
      })
      .catch((error) => console.error("Błąd:", error));

    setChecked("-r");
  }
  const handleFileChange = (event, setTreeValue) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      if (file.type === "application/json") {
        try {
          const jsonData = JSON.parse(content);
          setTreeValue(JSON.stringify(jsonData, null, 2));
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Invalid JSON file.");
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
        <button className={styles.button} onClick={exampleOne}>
          #1
        </button>
        <button className={styles.button} onClick={exampleTwo}>
          #2
        </button>
        <button className={styles.button} onClick={exampleThree}>
          #3
        </button>
        <button className={styles.button} onClick={exampleFour}>
          #4
        </button>
      </div>
    </>
  );
}
