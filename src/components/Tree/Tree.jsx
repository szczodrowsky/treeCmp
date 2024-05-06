import { useState } from "react";
import { useRef } from "react";
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
        checked={checked === button.name}
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

    setChecked("Ref-to-all comparison");
  }
  function exampleTwo() {
    fetch("/src/assets/matrix_comparison/matrix_comparison_one.txt")
      .then((response) => response.text())
      .then((data) => {
        setTreeValue1(data.trim());
      })
      .catch((error) => console.error("Błąd:", error));

    setChecked("Matrix comparison");
  }
  function exampleThree() {
    fetch("/src/assets/matrix_comparison/matrix_comparison_two.txt")
      .then((response) => response.text())
      .then((data) => {
        setTreeValue1(data.trim());
      })
      .catch((error) => console.error("Błąd:", error));

    setChecked("Matrix comparison");
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

    setChecked("Ref-to-all comparison");
  }
  const inputFile = useRef(null);
  const fileLoad = () => {
    inputFile.current.click();
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
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              placeholder="Untilted"
            />
            <button onClick={fileLoad}>Input file </button>
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
        {checked === "Ref-to-all comparison" && (
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
                  id="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                  placeholder="Untilted"
                />
                <button onClick={fileLoad}>Input file </button>
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
